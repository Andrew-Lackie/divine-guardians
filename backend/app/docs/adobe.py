import os
import requests
import json
import time
from adobe_jwt import get_jwt, verify_token
from dotenv import dotenv_values
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.environ["ADOBE_CLIENT_ID"]

# Generates JWT and access tokens

def verify_env():

    prev_env = dotenv_values(".env")
    access_token = prev_env["ADOBE_ACCESS_TOKEN"]
    jwt_token = prev_env["ADOBE_JWT_TOKEN"]

    status = verify_token(jwt_token)

    print(status["status"])

    if status["status"] == "invalid":
        print("Tokens are expired. Fetching new tokens...")
        new_access_token, new_jwt_token = get_jwt()

        with open("../.env", "r") as f:
            lines = f.readlines()[:-2]
            lines.append(f'ADOBE_JWT_TOKEN="{new_jwt_token}"')
            lines.append(f'\nADOBE_ACCESS_TOKEN="{new_access_token}"')
            with open("../.env", "w") as file:
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
    status_code = response.status_code
    uploadUri = json_response["uploadUri"]
    assetID = json_response["assetID"]
    return uploadUri, assetID


def upload_asset(url, assetID):
    headers = {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    with open("docx/salesOrderTemplate.docx", "rb") as f:
        data = f.read()

    response = requests.put(url=url, headers=headers, data=data)

    return assetID


def generate_pdf(access_token, assetID):

    params = {"assetID": assetID}

    with open("json/salesOrder.json") as f:
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


def download_file():

    # Verify JWT validity. If invalid, then generates another set of JWT and access tokens.

    access_token = verify_env()

    # Get asset

    url, assetID = get_asset(access_token)

    # Upload asset

    assetID = upload_asset(url, assetID)

    # Generate PDF

    url = generate_pdf(access_token, assetID)

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

            with open("test.pdf", "wb") as f:
                f.write(bytes(file.content))
            poll = False
        else:
            time.sleep(5)

    return {"status": file.status_code}


download_file()
