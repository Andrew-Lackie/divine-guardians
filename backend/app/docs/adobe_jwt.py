import datetime
import calendar
from datetime import datetime as d
import json
import jwt
from jwt.exceptions import ExpiredSignatureError
from cryptography import x509
from cryptography.hazmat.backends import default_backend
import os
import requests
from dotenv import dotenv_values
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.environ["ADOBE_CLIENT_ID"]
CLIENT_SECRET = os.environ["ADOBE_CLIENT_SECRET"]
ALGORITHM = "RS256"


def verify_token(token):
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
                    token,
                    public_key,
                    audience="https://ims-na1.adobelogin.com/c/79d4a736cf0644a9a0ad0974169805c4",
                    algorithms=[ALGORITHM],
                )
            )
        )

        return {"status": "valid"}

    except ExpiredSignatureError as error:
        print(f"Unable to decode the token, error: {error}")
        return {"status": "invalid"}


# def exp():
# central_time = d.utcnow()
# time_tuple = central_time.timetuple()
# expiry = calendar.timegm(time_tuple)
# expiry = expiry + 86400

# return expiry


def get_jwt():

    # expiry = exp()

    # Config Data
    url = "https://ims-na1.adobelogin.com/ims/exchange/jwt"
    jwtPayloadRaw = """{"exp":1,"iss":"01D041266393B7080A495FE1@AdobeOrg",
                        "sub":"036A4B366393C5B20A495C7D@techacct.adobe.com",
                        "https://ims-na1.adobelogin.com/s/ent_documentcloud_sdk":true,
                        "aud":"https://ims-na1.adobelogin.com/c/79d4a736cf0644a9a0ad0974169805c4"}"""

    jwtPayloadJson = json.loads(jwtPayloadRaw)
    jwtPayloadJson["exp"] = datetime.datetime.utcnow() + datetime.timedelta(hours=24)

    accessTokenRequestPayload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    # Request Access Key
    keyfile = open(os.path.join(os.path.expanduser("~"), ".ssh/private.key"), "r")
    private_key = keyfile.read()

    # Encode the jwt Token
    jwt_token = jwt.encode(jwtPayloadJson, private_key, algorithm=ALGORITHM)

    accessTokenRequestPayload["jwt_token"] = jwt_token
    result = requests.post(url, data=accessTokenRequestPayload)
    resultjson = json.loads(result.text)

    # Echo out the jwt token
    print(jwt_token)
    print("\n")

    return resultjson["access_token"], jwt_token
