from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

from .models import Profile
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


class TestRegisterApiView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")

        self.url = reverse("register")

    def test__user_registration_with_valid_data__returns_201(self):
        user_data = {
            "username": "Mario",
            "email": "mario.lupo@gmail.com",
            "country": self.country.pk,
            "password1": "G7!rZQ9@kM2#Fv8L",
            "password2": "G7!rZQ9@kM2#Fv8L",
        }

        response = self.client.post(self.url, user_data)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(User.objects.filter(username=data["username"]).exists())

        user = User.objects.get(username=data["username"])

        self.assertTrue(Profile.objects.filter(user=user))

    def test__user_registration_with_password_mismatch__returns_400(self):
        user_data = {
            "username": "Mario",
            "email": "mario.lupo@gmail.com",
            "country": self.country.pk,
            "password1": "G7!rZQ9@kM2#Fv8L",
            "password2": "G7!rZQM2#Fv8L",
        }

        response = self.client.post(self.url, user_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
