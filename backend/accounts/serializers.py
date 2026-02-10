from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Profile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True,
    )
    password2 = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "country",
            "password1",
            "password2",
        ]

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match!")

        return data

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        user = User.objects.create_user(password=password, **validated_data)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(
        required=False,
        allow_null=True,
        use_url=True,
    )

    class Meta:
        model = Profile
        fields = ["user", "profile_image", "bio", "account_type", "city"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(
        read_only=True,
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "profile", "country"]
