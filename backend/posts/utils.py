import base64
import os
import mimetypes

import requests
from math import radians, sin, atan2, cos, sqrt
from dotenv import load_dotenv

load_dotenv()

def calculate_distance(latitude_1: float, longitude_1: float, latitude_2:float, longitude_2: float) -> float:
    """
    Calculates the distance between two coordinates with the Haversine formula.
    """
    R = 6371 # Radius of the Earth in kilometers

    latitude_1, longitude_1, latitude_2, longitude_2 = map(
        radians,
        [latitude_1, longitude_1, latitude_2, longitude_2]
    )

    delta_latitude = latitude_2 - latitude_1
    delta_longitude = longitude_2 - longitude_1

    a = sin(delta_latitude / 2) ** 2 + cos(latitude_1) * cos(latitude_2) * sin(delta_longitude / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

def get_image_base64_from_url(url: str) -> str:
    response = requests.get(url)

    if response.status_code != 200:
        raise ValueError(f"Could not fetch image: {response.status_code}")

    return base64.b64encode(response.content).decode("utf-8")

def get_mimetype_from_url(url: str) -> str:
    mime_type, _ = mimetypes.guess_type(url)

    if not mime_type:
        return "image/jpeg"

    return mime_type

def analyze_image(image_b64: str, mime_type: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv("GEMINI_MODEL_NAME")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                    "text":
                        "Analyze this image and tell me the type and breed of the animal, "
                        "for example: 'Persian cat', 'Golden Retriever dog', 'Egyptian Mau cat', etc. "
                        "If the breed cannot be determined confidently, respond with just the type of animal "
                        "(e.g., 'Cat', 'Dog', 'Parrot', etc.).",
                    },
                    {"inline_data": {
                        "mime_type": mime_type,
                        "data": image_b64,
                    }}
                ]
            }
        ]
    }

    response = requests.post(url, json=payload)
    data = response.json()

    try:
        result = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        return f"Unexpected response: {data}"

    return result
