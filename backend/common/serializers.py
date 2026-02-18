from rest_framework import serializers

from cities_light.models import City, Country

from .models import Notification


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "id",
            "name",
            "country",
            "latitude",
            "longitude",
        ]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = [
            "id",
            "name",
            "code2",
        ]


class ContactSerializer(serializers.Serializer):
    subject = serializers.CharField(
        max_length=50,
    )
    email = serializers.EmailField()
    message = serializers.CharField()


class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "recipient",
            "sender",
            "notification_type",
            "post_id",
            "text",
            "is_read",
            "created_at",
        ]

    def get_sender(self, obj):
        from accounts.serializers import UserSerializer

        if obj.sender:
            return UserSerializer(obj.sender).data

        return None
