from rest_framework import serializers

from .models import CityGroup


class CityGroupSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(
        max_length=100,
        source="owner.username",
    )
    class Meta:
        model = CityGroup
        fields = ["name", "description", "owner",]
