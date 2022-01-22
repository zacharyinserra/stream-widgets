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
    data = {}
    access_token = get_validated_access_token()
    if access_token and access_token != "":
        data["ok"] = True
    else:
        data["ok"] = False
    return data


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
    access_token = get_validated_access_token()

    url = "https://api.twitch.tv/helix/goals?broadcaster_id={}".format(user_id)
    headers = {
        "Client-ID": client_id,
        "Authorization": "Bearer {}".format(access_token),
    }
    response = requests.request("GET", url, headers=headers, data={})

    return response.text


@api.route("/game-name", methods=["GET"])
def get_game_name():
    access_token = get_validated_access_token()

    url = "https://api.twitch.tv/helix/streams?user_id=515718489"

    payload = {}
    headers = {
        "Client-ID": client_id,
        "Authorization": "Bearer {}".format(access_token),
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_validated_access_token():
    with open("data.json", "r") as infile:
        api_data = json.load(infile)
    access_token = (
        api_data["token_data"]["access_token"]
        if "access_token" in api_data["token_data"]
        else ""
    )

    is_valid = validate(access_token)

    if is_valid:
        return access_token
    elif not is_valid and "refresh_token" in api_data["token_data"]:
        refresh_token = api_data["token_data"]["refresh_token"]

        url = "https://id.twitch.tv/oauth2/token"

        payload = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        }

        response = requests.request("POST", url, headers={}, data=payload)

        if "access_token" in response.json():
            token_data = json.loads(response.text)
            with open("data.json", "r") as infile:
                api_data = json.load(infile)
            api_data["token_data"] = token_data
            with open("data.json", "w") as outfile:
                json.dump(api_data, outfile)

            return response.json()["access_token"]
        else:
            return response.json()
    else:
        return ""


def validate(access_token):
    access_token = request.args.get("access_token")
    url = "https://id.twitch.tv/oauth2/validate"
    headers = {"Authorization": "Bearer {}".format(access_token)}

    response = requests.request("GET", url, headers=headers, data={})

    return response.ok


if __name__ == "__main__":
    api.run(host="localhost", port=8000, debug=True)
