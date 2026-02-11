from rest_framework import serializers
from django.db import transaction
from .models import Post, PetLocation, Comment
from .validators import ProfanityCheckValidator

from cities_light.models import City
from common.serializers import CitySerializer

from accounts.serializers import UserSerializer


class PetLocationModelSerializer(serializers.ModelSerializer):
    author = UserSerializer(
        read_only=True,
    )

    post_id = serializers.PrimaryKeyRelatedField(
        source="post",
        queryset=Post.objects.all(),
        write_only=True,
    )

    class Meta:
        model = PetLocation
        fields = [
            "id",
            "latitude",
            "longitude",
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
