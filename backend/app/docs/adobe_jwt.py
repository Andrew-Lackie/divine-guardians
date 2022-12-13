import datetime
import json
import jwt
from jwt.exceptions import ExpiredSignatureError
from cryptography import x509
from cryptography.hazmat.backends import default_backend
import os
import requests
from dotenv import load_dotenv, find_dotenv, dotenv_values

load_dotenv()

config = dotenv_values("../.env")

CLIENT_ID = config["ADOBE_CLIENT_ID"]
CLIENT_SECRET = config["ADOBE_CLIENT_SECRET"]
ALGORITHM = "RS256"


def verify_token():
    access_token, jwttoken = get_jwt()
    try:
        keyfile = open(
            os.path.join(os.path.expanduser("~"), ".ssh/certificate_pub.crt"), "r"
        )
        public_cert = keyfile.read()
        public_cert_byte = public_cert.encode("utf-8")
        public_key = x509.load_pem_x509_certificate(
            public_cert_byte, backend=default_backend()
        ).public_key()
        decoded = json.loads(
            json.dumps(
                jwt.decode(
                    jwttoken,
                    public_key,
                    audience="https://ims-na1.adobelogin.com/c/79d4a736cf0644a9a0ad0974169805c4",
                    algorithms=[ALGORITHM],
                )
            )
        )

        print(decoded)

        return {"status": "valid"}

    except ExpiredSignatureError as error:
        print(f"Unable to decode the token, error: {error}")
        return {"status": "invalid"}


def get_jwt():

    # Config Data
    url = "https://ims-na1.adobelogin.com/ims/exchange/jwt"
    jwtPayloadRaw = """{"exp":1670967189,"iss":"01D041266393B7080A495FE1@AdobeOrg",
                        "sub":"036A4B366393C5B20A495C7D@techacct.adobe.com",
                        "https://ims-na1.adobelogin.com/s/ent_documentcloud_sdk":true,
                        "aud":"https://ims-na1.adobelogin.com/c/79d4a736cf0644a9a0ad0974169805c4"}"""
    jwtPayloadJson = json.loads(jwtPayloadRaw)
    jwtPayloadJson["exp"] = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)

    accessTokenRequestPayload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    # Request Access Key
    keyfile = open(os.path.join(os.path.expanduser("~"), ".ssh/private.key"), "r")
    private_key = keyfile.read()

    # Encode the jwt Token
    jwttoken = jwt.encode(jwtPayloadJson, private_key, algorithm=ALGORITHM)

    accessTokenRequestPayload["jwt_token"] = jwttoken
    result = requests.post(url, data=accessTokenRequestPayload)
    resultjson = json.loads(result.text)

    # Echo out the jwt token
    print(jwttoken)
    print("\n")

    return resultjson["access_token"], jwttoken


verify_token()
