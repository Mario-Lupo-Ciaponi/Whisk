# fetch_europe_cities.py
import os
import django
import requests
from time import sleep

# ───────── Django setup ─────────
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")  # replace with your settings
django.setup()

from cities_light.models import Country, City  # your models

# ───────── GeoNames API settings ─────────
GEONAMES_USERNAME = "MarioLupo"  # sign up free at http://www.geonames.org/login
MAX_ROWS = 1000  # max per request

# European countries ISO-2 codes
EUROPE_COUNTRIES = [
    "AL", "AT", "BY", "BA", "HR", "CY",
    "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE",
    "XK", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL",
    "MK",  "PL", "PT", "RS", "SK", "SI",
    "UA",
]

FEATURE_CLASS = "P"  # populated places
CITY_TYPES = ["PPL", "PPLA", "PPLC"]  # major cities

# ───────── Function to fetch cities from GeoNames ─────────
def fetch_cities(country_code):
    url = "http://api.geonames.org/searchJSON"
    cities = []
    for city_type in CITY_TYPES:
        params = {
            "country": country_code,
            "featureClass": FEATURE_CLASS,
            "featureCode": city_type,
            "maxRows": MAX_ROWS,
            "username": GEONAMES_USERNAME,
        }
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()
        for item in data.get("geonames", []):
            cities.append({
                "name": item["name"],
                "latitude": float(item.get("lat", 0)),
                "longitude": float(item.get("lng", 0)),
                "population": int(item.get("population", 0)),
            })
        sleep(1)  # polite pause to avoid rate limits
    return cities

# ───────── Insert cities into Django DB ─────────
def insert_cities():
    country_codes = ["ES", "SE", "CH"]


    for country_code in country_codes:
        try:
            country = Country.objects.get(code2=country_code)  # FIX: use code2, not code
        except Country.DoesNotExist:
            print(f"Country {country_code} not found, skipping.")
        else:
            cities = fetch_cities(country_code)
            print(f"Inserting {len(cities)} cities for {country.name} ({country_code})")

            for city_data in cities:
                print(city_data)
                City.objects.update_or_create(
                    name=city_data["name"],
                    country=country,
                    defaults={
                        "latitude": city_data["latitude"],
                        "longitude": city_data["longitude"],
                        "population": city_data["population"],
                    }
                )

def print_countries():
    countries = Country.objects.all()

    for c in countries:
        print(c, c.pk)

if __name__ == "__main__":
    # insert_cities()
    print_countries()