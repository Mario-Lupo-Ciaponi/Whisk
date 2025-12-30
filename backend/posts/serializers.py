from rest_framework import serializers
from .models import Post

class PostModelSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(
        source="author.username",
        read_only=True
    )
    class Meta:
        model = Post
        fields = ["id", "title", "description", "city", "found", "author_username",]
