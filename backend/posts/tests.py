from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Post
from cities_light.models import Country, City

User = get_user_model()


class TestPostListCreateAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.super_user = User.objects.create_superuser(
            username="superuser", password="admin", country=self.country
        )
        self.author_user = User.objects.create_user(
            username="testuser", password="test", country=self.country
        )
        self.normal_user = User.objects.create_user(
            username="testuser2", password="test2", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.author_user,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.update_data = {"title": "A brand new title"}

        self.url = reverse("post-details", kwargs={"pk": self.post.pk})

    def test__get_post__gets_successfully(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data["title"], self.post.title)
        self.assertEqual(response.data["description"], self.post.description)
        self.assertEqual(response.data["city"]["id"], self.city.pk)
        self.assertEqual(response.data["author"]["id"], self.author_user.pk)
        self.assertEqual(
            response.data["image"],
            "https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample",
        )

    def test__update_post_as_unauthenticated_user__returns_401(self):
        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.post.refresh_from_db()
        self.assertNotEqual(self.post.title, self.update_data["title"])

    def test__delete_post_as_unauthenticated_user__returns_401(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(Post.objects.filter(pk=self.post.pk).exists())

    def test__update_post_as_author__updates_post(self):
        self.client.force_authenticate(self.author_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.post.refresh_from_db()
        self.assertEqual(self.post.title, self.update_data["title"])

    def test__deletes_post_as_author__deletes_post(self):
        self.client.force_authenticate(self.author_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Post.objects.filter(pk=self.post.pk).exists())

    def test__updates_post_as_admin__updates_post(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.post.refresh_from_db()
        self.assertEqual(self.post.title, self.update_data["title"])

    def test__deletes_post_as_admin__deletes_post(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Post.objects.filter(pk=self.post.pk).exists())

    def test__updates_post_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.post.refresh_from_db()
        self.assertNotEqual(self.post.title, self.update_data["title"])

    def test__delete_post_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Post.objects.filter(pk=self.post.pk).exists())
