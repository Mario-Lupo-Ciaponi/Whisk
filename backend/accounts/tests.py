from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

from cities_light.models import Country

User = get_user_model()


class TestCurrentUserAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")

        self.user = User.objects.create_user(
            username="Test",
            email="test@gmail.com",
            password="testpass",
            country=self.country,
        )

        self.url = reverse("me")

    def test__get_current_user_as_unauthenticated_user__returns_401(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test__get_current_user_as_authenticated_user__returns_200(self):
        self.client.force_authenticate(self.user)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(data["id"], self.user.pk)
        self.assertEqual(data["username"], self.user.username)
        self.assertEqual(data["email"], self.user.email)
        self.assertEqual(data["country"], self.user.country.id)
