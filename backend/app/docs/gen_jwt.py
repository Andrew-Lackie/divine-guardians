import datetime
import json
import jwt
import os
import requests

# Config Data
url = "https://ims-na1.adobelogin.com/ims/exchange/jwt"
jwtPayloadRaw = """{ "iss": "01D041266393B7080A495FE1@AdobeOrg",
                     "sub": "aec15c19-ae40-4e4b-815a-d0e96b8390ee@techacct.adobe.com",
                     "https://ims-na1.adobelogin.com/s/ent_analytics_bulk_ingest_sdk": true,
                     "aud": "https://ims-na1.adobelogin.com/c/51263c0f4aad44ef82712161cfe08c07" }"""
jwtPayloadJson = json.loads(jwtPayloadRaw)
jwtPayloadJson["exp"] = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)

accessTokenRequestPayload = {
    "client_id": "51263c0f4aad44ef82712161cfe08c07",
    "client_secret": "p8e-4e89z1Tp5EgWLYbh3s_og4KBjHJl4qTf",
}

# Request Access Key
# This Needs to point at where your private key is on the file system
keyfile = open(os.path.join(os.path.expanduser("~"), ".ssh/private.key"), "r")
private_key = keyfile.read()

# Encode the jwt Token
jwttoken = jwt.encode(jwtPayloadJson, private_key, algorithm="RS256")
# print("Encoded JWT Token")
# print(jwttoken.decode('utf-8'))


# We are making a http request simmilar to this curl request
# curl -X POST -H "Content-Type: multipart/form-data" -F "client_id=CLIENT_ID" -F "client_secret=CLIENT_SECRET" -F "jwt_token=`./jwtenc.sh`" https://ims-na1.adobelogin.com/ims/exchange/jwt
accessTokenRequestPayload["jwt_token"] = jwttoken
result = requests.post(url, data=accessTokenRequestPayload)
resultjson = json.loads(result.text)
# print("Full output from the access token request")
# print(json.dumps(resultjson, indent=4, sort_keys=True))

# Echo out the access token
print(resultjson)
# print(resultjson["access_token"]);
