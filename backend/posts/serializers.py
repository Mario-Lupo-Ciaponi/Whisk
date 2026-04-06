import requests
import os

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from django.db import transaction

from .models import Post, PetLocation, Comment
from .validators import ProfanityCheckValidator
from .utils import calculate_distance

from cities_light.models import City
from common.serializers import CitySerializer

from accounts.serializers import UserSerializer

LOCATION_IQ_URL = "https://us1.locationiq.com/v1/"


class PetLocationModelSerializer(serializers.ModelSerializer):
    author = UserSerializer(
        read_only=True,
    )

    post_id = serializers.PrimaryKeyRelatedField(
        source="post",
        queryset=Post.objects.all(),
        write_only=True,
    )

    def validate(self, attrs):
        latitude = attrs.get("latitude")
        longitude = attrs.get("longitude")
        post = attrs.get("post")

        api_key = os.getenv("LOCATION_IQ_API_KEY")
        kilometers_cap = 15

        try:
            response = requests.get(
                LOCATION_IQ_URL + "reverse",
                params={
                    "key": api_key,
                    "lat": latitude,
                    "lon": longitude,
                    "format": "json",
                },
                timeout=3,
            )

            response.raise_for_status()
            data = response.json()

            address = data.get("address", {})

            city_name = (
                address.get("city")
                or address.get("town")
                or address.get("village")
                or address.get("municipality")
            )

            if not city_name:
                raise ValidationError("Could not determine city from coordinates.")

            if city_name.lower() not in post.city.name.lower():
                city_response = requests.get(
                    LOCATION_IQ_URL + "search",
                    params={
                        "key": api_key,
                        "q": post.city.name,
                        "format": "json",
                    },
                    timeout=3,
                )

                city_results = city_response.json()

                if not city_results:
                    raise ValidationError("Could not resolve the selected city.")

                city_data = city_results[0]

                lat2 = float(city_data["lat"])
                lon2 = float(city_data["lon"])

                distance = calculate_distance(latitude, longitude, lat2, lon2)

                if distance > kilometers_cap:
                    raise ValidationError(
                        "Location must be within 15 km of the selected city."
                    )

            attrs["street_address"] = data["display_name"]
        except (requests.RequestException, KeyError, IndexError, ValueError) as e:
            raise ValidationError(f"Location service unavailable: {str(e)}")

        return attrs

    class Meta:
        model = PetLocation
        fields = [
            "id",
            "latitude",
            "longitude",
            "street_address",
            "post_id",
            "created_at",
            "is_valid",
            "author",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(
        read_only=True,
    )
    post = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )
    post_input = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Post.objects.all(), source="post"
    )

    class Meta:
        model = Comment
        fields = [
            "id",
            "content",
            "created_at",
            "author",
            "post",
            "post_input",
        ]


class PostModelSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        validators=[
            ProfanityCheckValidator(),
        ]
    )
    description = serializers.CharField(
        validators=[
            ProfanityCheckValidator(),
        ]
    )
    animal_type = serializers.CharField(
        read_only=True,
    )
    author = UserSerializer(
        read_only=True,
    )
    image = serializers.ImageField(
        required=True,
    )
    city = CitySerializer(
        read_only=True,
    )
    city_id = serializers.PrimaryKeyRelatedField(
        source="city",
        queryset=City.objects.all(),
        write_only=True,
    )
    locations = PetLocationModelSerializer(
        read_only=True,
        many=True,
    )
    locations_count = serializers.SerializerMethodField()
    comments = CommentSerializer(
        read_only=True,
        many=True,
    )
    comments_count = serializers.SerializerMethodField()
    save_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "description",
            "animal_type",
            "city",
            "city_id",
            "found",
            "posted_on",
            "author",
            "image",
            "locations",
            "locations_count",
            "comments",
            "comments_count",
            "save_count",
        ]

    def get_locations_count(self, obj):
        return obj.locations.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_save_count(self, obj):
        return obj.saved_by.count()
