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
        self.normal_user = User.objects.create_user(
            username="testuser", password="test", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.normal_user,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.url = reverse("post-details", kwargs={"pk": self.post.pk})

    def test__get_post(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data["title"], self.post.title)
        self.assertEqual(response.data["description"], self.post.description)
        self.assertEqual(response.data["city"]["id"], self.city.pk)
        self.assertEqual(response.data["author"]["id"], self.normal_user.pk)
        self.assertEqual(
            response.data["image"],
            "https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample",
        )
