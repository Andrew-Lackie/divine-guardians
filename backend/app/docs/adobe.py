import os
import requests
from fastapi import status, HTTPException
import json
import time
from .adobe_jwt import get_jwt, verify_token
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.environ["ADOBE_CLIENT_ID"]

# Directory and file variables

project_dir = os.path.abspath(os.getcwd())
docs = os.path.join(project_dir, "app/docs")
adobe_env = os.path.join(docs, ".env")
pdf = os.path.join(docs, "pdf")
docx = os.path.join(docs, "docx")


def verify_env():

    # Generates JWT and access tokens

    access_token = os.environ["ADOBE_ACCESS_TOKEN"]
    jwt_token = os.environ["ADOBE_JWT_TOKEN"]

    print(jwt_token)

    status = verify_token(jwt_token)

    print(status["status"])

    if status["status"] == "invalid":
        print("Tokens are expired. Fetching new tokens...")
        new_access_token, new_jwt_token = get_jwt()

        with open(adobe_env, "r") as f:
            lines = f.readlines()[:-2]
            lines.append(f'ADOBE_JWT_TOKEN="{new_jwt_token}"')
            lines.append(f'\nADOBE_ACCESS_TOKEN="{new_access_token}"')
            with open(adobe_env, "w") as file:
                file.writelines(lines)

        return new_jwt_token, new_access_token

    else:
        return access_token


def get_asset(access_token):

    url = "https://pdf-services.adobe.io/assets"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-API-Key": CLIENT_ID,
        "Content-Type": "application/json",
    }

    data = {
        "mediaType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    response = requests.post(url=url, headers=headers, json=data)
    json_response = json.loads(response.text)

    if response.status_code == 401:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Adobe Oauth token is not valid",
        )

    else:
        uploadUri = json_response["uploadUri"]
        assetID = json_response["assetID"]
        return uploadUri, assetID


def upload_asset(url, assetID, docx):
    headers = {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
    # with open("docx/salesOrderTemplate.docx", "rb") as f:
    with open(docx, "rb") as f:
        data = f.read()

    response = requests.put(url=url, headers=headers, data=data)

    return assetID


def generate_pdf(access_token, assetID, user_data):

    params = {"assetID": assetID}
    salesOrder = os.path.join(docs, "json/salesOrder.json")  # ----- For testing -----#
    with open(salesOrder) as f:
        data = json.load(f)

    data.update(params)
    url = "https://pdf-services.adobe.io/operation/documentgeneration"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-API-Key": CLIENT_ID,
        "Content-Type": "application/json",
    }

    response = requests.post(url=url, headers=headers, json=data)
    down_url = response.headers["location"]

    time.sleep(5)

    return down_url


def set_dir(user_id, document):
    user_file = os.path.join(pdf, user_id)

    if not os.path.exists(user_file):
        os.mkdir(user_file)

    template = os.path.join(docx, f"{document}.docx")
    user_doc = os.path.join(user_file, f"{document}.pdf")

    return template, user_doc


def download_file(user_id, document, user_data):

    # set directories

    docx, pdf = set_dir(user_id, document)

    # Verify JWT validity. If invalid, then generates another set of JWT and access tokens.

    access_token = verify_env()

    # Get asset

    url, assetID = get_asset(access_token)

    # Upload asset

    assetID = upload_asset(url, assetID, docx)

    # Generate PDF

    url = generate_pdf(access_token, assetID, user_data)

    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-API-Key": CLIENT_ID,
    }

    poll = True
    while poll:
        response = requests.get(
            url=url,
            headers=headers,
        )
        json_response = json.loads(response.text)
        print(json_response)

        if json_response["status"] == "done":
            down_url = json_response["asset"]["downloadUri"]

            file = requests.get(
                url=down_url,
            )

            with open(pdf, "wb") as f:
                f.write(bytes(file.content))
            poll = False
        else:
            time.sleep(5)

    return {"status": file.status_code}


# status = download_file("1", "salesOrderTemplate", 1)
# print(status)
