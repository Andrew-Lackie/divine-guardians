import os
import requests
import json
import time
from dotenv import load_dotenv
from adobe_jwt import get_jwt, verify_token

load_dotenv()

CLIENT_ID = os.environ.get("ADOBE_CLIENT_ID")

# Generates JWT and access tokens

global access_token, jwttoken

access_token, jwttoken = get_jwt()


def get_asset():

    # Verify JWT validity. If invalid, then generates another set of JWT and access tokens.

    status = verify_token(jwttoken)

    if status == "invalid":
        access_token, jwttoken = get_jwt()

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
    print(json_response)
    status_code = response.status_code
    uploadUri = json_response["uploadUri"]
    assetId = json_response["assetID"]
    print(uploadUri)
    return uploadUri, assetId


def upload_asset():
    url, assetID = get_asset()

    headers = {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    with open("docx/salesOrderTemplate.docx", "rb") as f:
        data = f.read()

    response = requests.put(url=url, headers=headers, data=data)

    print(assetID)
    return assetID


def generate_pdf():
    assetID = upload_asset()

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

    print(down_url)
    return down_url


def downloadFile():

    url = generate_pdf()

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


downloadFile()
