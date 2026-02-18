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
    class Meta:
        model = Notification
        fields = [
            "recipient",
            "sender",
            "notification_type",
            "post_id",
            "text",
            "is_read",
            "created_at",
        ]
