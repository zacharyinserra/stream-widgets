from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

client_id = os.getenv("TWTICH_CLIENT_ID")
client_secret = os.getenv("TWITCH_CLIENT_SECRET")
redirect_uri = os.getenv("TWITCH_REDIRECT_URI")
user_id = os.getenv("TWITCH_USER_ID")
scope = "channel:read:goals,channel:read:polls"

api = Flask(__name__)
CORS(api, resources={r"/*": {"origins": "*"}})


@api.route("/token", methods=["GET"])
def token():
    f = open("data.json")
    token_data = json.load(f)
    access_token = token_data["token_data"]["access_token"]
    is_token_valid = validate(access_token)

    if is_token_valid:
        return access_token
    else:  # TO-DO try refreshing token
        return ""


@api.route("/validate", methods=["GET"])
def validate(access_token):
    url = "https://id.twitch.tv/oauth2/validate"
    headers = {"Authorization": "Bearer {}".format(access_token)}

    response = requests.request("GET", url, headers=headers, data={})

    return response.ok


@api.route("/code", methods=["POST"])
def save_code():
    code = request.headers.get("Code")
    url = "https://id.twitch.tv/oauth2/token"

    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri,
    }

    response = requests.request("POST", url, headers={}, data=payload)

    token_data = json.loads(response.text)
    with open("data.json", "r") as infile:
        api_data = json.load(infile)
    api_data["token_data"] = token_data
    with open("data.json", "w") as outfile:
        json.dump(api_data, outfile)

    return json.dumps(response.ok)


@api.route("/creator-goals", methods=["GET"])
def get_creator_goals():
    with open("data.json", "r") as infile:
        api_data = json.load(infile)
    access_token = api_data["token_data"]["access_token"]
    url = "https://api.twitch.tv/helix/goals?broadcaster_id={}".format(user_id)

    headers = {
        "Client-ID": client_id,
        "Authorization": "Bearer {}".format(access_token),
    }

    response = requests.request("GET", url, headers=headers, data={})

    return response.text


if __name__ == "__main__":
    api.run(debug=True)
