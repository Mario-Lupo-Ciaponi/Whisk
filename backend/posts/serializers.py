from rest_framework import serializers
from django.db import transaction
from .models import Post, PetLocation, Comment
from .validators import ProfanityCheckValidator

from cities_light.models import City
from common.serializers import CitySerializer

from accounts.serializers import UserSerializer


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
    locations = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=PetLocation.objects.all(),
    )
    locations_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "description",
            "city",
            "city_id",
            "found",
            "posted_on",
            "author",
            "image",
            "locations",
            "locations_count",
        ]

    def get_locations_count(self, obj):
        return obj.locations.count()


class PetLocationModelSerializer(serializers.ModelSerializer):
    author = UserSerializer(
        read_only=True,
    )

    post_id = serializers.IntegerField()

    def create(self, validated_data):
        post_id = validated_data.pop("post_id")

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist: #TODO: change the expected error
            raise serializers.ValidationError(f"Post with id {post_id} does not exist.")

        # If the M2M fails, it will roll back
        with transaction.atomic():
            pet_location = PetLocation.objects.create(**validated_data, post=post)

        return pet_location

    class Meta:
        model = PetLocation
        fields = ["id", "latitude", "longitude", "post_id", "created_at", "is_valid", "author",]


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(
        read_only=True,
    )
    post = PostModelSerializer(
        read_only=True,
    )

    class Meta:
        model = Comment
        fields = ["id", "content", "author", "post",]
