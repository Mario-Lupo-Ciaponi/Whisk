from rest_framework import serializers
from django.db import transaction
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
    locations = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=PetLocation.objects.all(),
    )

    class Meta:
        model = Post
        fields = ["id", "title", "description", "city", "found", "posted_on", "author", "image", "locations",]


class PetLocationModelSerializer(serializers.ModelSerializer):
    author = serializers.CharField(
        source="author.username",
        read_only=True,
    )

    post_id = serializers.IntegerField(
        write_only=True,
    )

    def create(self, validated_data):
        post_id = validated_data.pop("post_id")

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExists: #TODO: change the expected error
            raise serializers.ValidationError(f"Post with id {post_id} does not exist.")

        # If the M2M fails, it will roll back
        with transaction.atomic():
            pet_location = PetLocation.objects.create(**validated_data)
            post.locations.add(pet_location)

        return pet_location

    class Meta:
        model = PetLocation
        fields = ["id", "latitude", "longitude", "post_id", "date_seen", "author",]
