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


class TestUserListAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")

        self.user_1 = User.objects.create_user(
            username="Mark", password="testpass", country=self.country
        )
        self.user_2 = User.objects.create_user(
            username="Mario", password="testpass", country=self.country
        )
        self.user_3 = User.objects.create_user(
            username="Iskra", password="testpass", country=self.country
        )

        self.url = reverse("user-list")

    def test__filter_users_with_valid_params_lower_case__returns_filtered_users(self):
        response = self.client.get(f"{self.url}?search=ma")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 2)

    def test__filter_users_with_valid_params_upper_case__returns_filtered_users(self):
        response = self.client.get(f"{self.url}?search=MA")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 2)

    def test__filter_users_with_invalid_params__returns_no_users(self):
        response = self.client.get(f"{self.url}?search=to")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 0)

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


class TestProfileUpdate(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")

        self.user = User.objects.create_user(
            username="Test", password="testpass", country=self.country
        )
        self.second_user = User.objects.create_user(
            username="Test2", password="testpass2", country=self.country
        )
        self.super_user = User.objects.create_superuser(
            username="Admin", password="admin", country=self.country
        )

        self.profile = Profile.objects.get(user=self.user.pk)

        self.update_data = {
            "bio": "a new bio",
        }

        self.url = reverse("profile", kwargs={"pk": self.user.pk})

    def test__update_profile_as_another_profile__returns_403(self):
        self.client.force_authenticate(self.second_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.profile.refresh_from_db()
        self.assertNotEqual(self.update_data["bio"], self.profile.bio)

    def test__update_profile_as_profiles_user__returns_200(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.update_data["bio"], self.profile.bio)

    def test__update_profile_as_admin__returns_200(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.profile.refresh_from_db()
        self.assertEqual(self.update_data["bio"], self.profile.bio)
