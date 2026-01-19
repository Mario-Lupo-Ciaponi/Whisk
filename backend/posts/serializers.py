from rest_framework import serializers
from .models import Post, PetLocation
from .validators import ProfanityCheckValidator


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
    author = serializers.CharField(
        source="author.username",
        read_only=True,
    )
    image = serializers.ImageField(
        required=True,
    )

    class Meta:
        model = Post
        fields = ["id", "title", "description", "city", "found", "posted_on", "author", "image",]


class PetLocationModelSerializer(serializers.ModelSerializer):
    author = serializers.CharField(
        source="author.username",
        read_only=True,
    )

    class Meta:
        model = PetLocation
        fields = ["id", "latitude", "longitude", "date_seen", "author",]
