from rest_framework import serializers
from .models import Post

from profanity_check import predict, predict_prob


class PostModelSerializer(serializers.ModelSerializer):
    author = serializers.CharField(
        source="author.username",
        read_only=True
    )

    def validate(self, data):
        if predict([data["title"], data["description"]]).any():
            raise serializers.ValidationError("Profanity is not allowed in the posts!")

        return data

    class Meta:
        model = Post
        fields = ["id", "title", "description", "city", "found", "posted_on", "author",]
