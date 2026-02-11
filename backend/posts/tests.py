from io import BytesIO
from PIL import Image
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.serializers import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Post, PetLocation, Comment
from cities_light.models import Country, City

User = get_user_model()


class TestPostListCreateAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.user = User.objects.create_user(
            username="TestUser", password="Test", country=self.country
        )

        image_io = BytesIO()
        image = Image.new("RGB", (1, 1), "white")
        image.save(image_io, "JPEG")
        image_io.seek(0)

        self.image_file = SimpleUploadedFile(
            name="test-image.jpeg", content=image_io.read(), content_type="image/jpeg"
        )

        self.url = reverse("post-list")

    def test__create_post_as_unauthenticated_user__returns_401(self):
        data = {
            "title": "A test post",
            "description": "This is just a test post that has no real value outside this TestCase class",
            "city_id": self.city.pk,
            "image": self.image_file,
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Post.objects.filter(pk=1).exists())

    def test__create_post_with_valid_input__returns_201(self):
        data = {
            "title": "A test post",
            "description": "This is just a test post that has no real value outside this TestCase class",
            "city_id": self.city.pk,
            "image": self.image_file,
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(self.url, data, format="multipart")
        data = response.data

        post_pk = int(data["id"])

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Post.objects.filter(pk=post_pk).exists())

        post = Post.objects.get(pk=post_pk)

        self.assertEqual(post.title, data["title"])
        self.assertEqual(post.description, data["description"])
        self.assertEqual(post.city, self.city)
        self.assertEqual(post.author, self.user)
        self.assertTrue(post.image.url)

    def test__create_post_profanity_validator_with_invalid_data__raises_validation_error(
        self,
    ):
        data = {
            "title": "A test fuck",
            "description": "This is just a test post that has no real value outside this TestCase class",
            "city_id": self.city.pk,
            "image": self.image_file,
        }

        self.client.force_authenticate(self.user)

        response = self.client.post(self.url, data, format="multipart")

        data = response.data

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", data)
        self.assertIn("profanity_error", data["title"])

        self.assertFalse(Post.objects.filter(pk=1).exists())

    def test__get_posts_with_no_posts__returns_pagination_list_with_empty_results(self):
        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(data["count"], 0)
        self.assertIsNone(data["next"])
        self.assertIsNone(data["previous"])
        self.assertEqual(len(data["results"]), 0)

    def test__get_posts_with_posts__returns_pagination_list_with_results(self):
        data = {
            "title": "A test post",
            "description": "This is just a test post that has no real value outside this TestCase class",
            "city_id": self.city.pk,
            "image": self.image_file,
        }

        Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.user,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(data["count"], 1)
        self.assertIsNone(data["next"])
        self.assertIsNone(data["previous"])
        self.assertEqual(len(data["results"]), 1)

    def test__get_posts_with_many_posts__returns_pagination_list_with_results(self):
        posts_data = [
            Post(
                title=f"A test post {i + 1}",
                description=f"This is just a test post that has no real value outside this TestCase class {i + 1}",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            )
            for i in range(7)
        ]

        Post.objects.bulk_create(posts_data)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(data["count"], 7)
        self.assertIsNotNone(data["next"])
        self.assertIsNone(data["previous"])
        self.assertEqual(len(data["results"]), 6)

    def test__get_posts_filter_with_found_query_params__returns_filtered_posts(self):
        posts_data = [
            Post(
                title=f"A test post 1",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 2",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                found=True,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 3",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                found=True,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
        ]

        Post.objects.bulk_create(posts_data)

        response = self.client.get(f"{self.url}?found=True")
        data = response.data

        self.assertEqual(len(data["results"]), 2)

    def test__get_posts_filter_with_city_query_params__returns_filtered_posts(self):
        city_2 = City.objects.create(name="Vratsa", country=self.country)

        posts_data = [
            Post(
                title=f"A test post 1",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=city_2,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 2",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 3",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
        ]

        Post.objects.bulk_create(posts_data)

        response = self.client.get(f"{self.url}?city={city_2.pk}")
        data = response.data

        self.assertEqual(len(data["results"]), 1)

    def test__get_posts_filter_with_invalid_query_params__returns_all_posts(self):
        posts_data = [
            Post(
                title=f"A test post 1",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 2",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 3",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
        ]

        Post.objects.bulk_create(posts_data)

        response = self.client.get(f"{self.url}?description=dwad")
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data["results"]), 3)

    def test__get_posts_with_country_filter__returns_only_posts_from_users_country(self):
        country_2 = Country.objects.create(name="Italy", code2="IT")
        city_2 = City.objects.create(name="Rome", country=country_2)

        user_3 = User.objects.create_user(
            username="TestUse3r", password="testpass2", country=country_2
        )

        posts_data = [
            Post(
                title=f"A test post 1",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=city_2,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 2",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 3",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
        ]

        Post.objects.bulk_create(posts_data)

        self.client.force_authenticate(user_3)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data["results"]), 1)

    def test__get_posts_with_country_filter_as_unauthenticated_user__returns_posts_across_the_world(self):
        country_2 = Country.objects.create(name="Italy", code2="IT")
        city_2 = City.objects.create(name="Rome", country=country_2)

        posts_data = [
            Post(
                title=f"A test post 1",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=city_2,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 2",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
            Post(
                title=f"A test post 3",
                description=f"This is just a test post that has no real value outside this TestCase class",
                city=self.city,
                author=self.user,
                image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
            ),
        ]

        Post.objects.bulk_create(posts_data)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data["results"]), 3)


class TestPostRetrieveUpdateDestroyAPIView(APITestCase):
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

    from rest_framework.test import APIClient

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


class TestPetLocationListCreateAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.user = User.objects.create_user(
            username="Test", password="TestPass", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.user,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.location = PetLocation.objects.create(
            latitude=42.697777,
            longitude=23.321999,
            author=self.user,
            post=self.post,
        )

        self.create_data = {
            "latitude": 52.697777,
            "longitude": 33.321999,
            "post_id": self.post.pk,
        }

        self.url = reverse("location-list")

    def test__get_location_with_one_location__returns_200(self):
        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), PetLocation.objects.count())

    def test__get_location_with_multiple_locations__returns_200(self):
        location_data = [
            PetLocation(
                latitude=52.697777,
                longitude=33.321999,
                author=self.user,
                post=self.post,
            ),
            PetLocation(
                latitude=62.697777,
                longitude=43.321999,
                author=self.user,
                post=self.post,
            ),
        ]

        PetLocation.objects.bulk_create(location_data)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), PetLocation.objects.count())

    def test__get_location_with_no_locations__returns_200(self):
        PetLocation.objects.all().delete()

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), PetLocation.objects.count())

    def test__create_location_with_valid_input__returns_201(self):
        response = self.client.post(self.url, self.create_data)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(PetLocation.objects.filter(pk=data["id"]).exists())

        location = PetLocation.objects.get(pk=data["id"])

        self.assertIsNone(location.author)

    def test__create_location_with_invalid_post_id__returns_400(self):
        invalid_create_data = {
            "id": 18,
            "latitude": 52.697777,
            "longitude": 33.321999,
            "post_id": 91283908123021,
        }

        response = self.client.post(self.url, invalid_create_data)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(
            PetLocation.objects.filter(pk=invalid_create_data["id"]).exists()
        )

    def test__create_location_with_invalid_lat_and_lang__returns_400(self):
        invalid_create_data = {
            "id": 10,
            "latitude": 999.697777,
            "longitude": 999.321999,
            "post_id": self.post.pk,
        }

        response = self.client.post(self.url, invalid_create_data)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(
            PetLocation.objects.filter(pk=invalid_create_data["id"]).exists()
        )


class TestPetLocationRetrieveUpdateDestroyAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.super_user = User.objects.create_superuser(
            username="Super man", password="AdminPass", country=self.country
        )
        self.author = User.objects.create_user(
            username="Test", password="TestPass", country=self.country
        )
        self.normal_user = User.objects.create_user(
            username="Test2", password="TestPass2", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.author,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.location = PetLocation.objects.create(
            latitude=42.697777,
            longitude=23.321999,
            author=self.author,
            post=self.post,
        )

        self.update_data = {
            "latitude": 52.697777,
        }

        self.url = reverse("location-details", kwargs={"pk": self.location.pk})

    def test__get_locations__returns_200(self):
        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(float(data["latitude"]), self.location.latitude)
        self.assertEqual(float(data["longitude"]), self.location.longitude)
        self.assertEqual(data["author"]["id"], self.author.pk)

    def test__update_location_as_unauthenticated_user__returns_401(self):
        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.location.refresh_from_db()
        self.assertNotEqual(self.update_data["latitude"], self.location.latitude)

    def test__delete_location_as_unauthenticated_user__returns_401(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.assertTrue(PetLocation.objects.filter(pk=self.location.pk).exists())

    def test__update_location_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.location.refresh_from_db()
        self.assertNotEqual(self.update_data["latitude"], self.location.latitude)

    def test__delete_location_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertTrue(PetLocation.objects.filter(pk=self.location.pk).exists())

    def test__update_location_as_author__returns_200(self):
        self.client.force_authenticate(self.author)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.location.refresh_from_db()
        self.assertEqual(
            float(self.update_data["latitude"]), float(self.location.latitude)
        )

    def test__delete_location_as_author__returns_204(self):
        self.client.force_authenticate(self.author)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(PetLocation.objects.filter(pk=self.location.pk).exists())

    def test__update_location_as_admin__returns_200(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.location.refresh_from_db()
        self.assertEqual(
            float(self.update_data["latitude"]), float(self.location.latitude)
        )

    def test__delete_location_as_admin__returns_204(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(PetLocation.objects.filter(pk=self.location.pk).exists())


class TestCommentListCreateAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.user = User.objects.create_user(
            username="Test", password="TestPass", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.user,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.comment = Comment.objects.create(
            content="A test comment", author=self.user, post=self.post
        )

        self.create_data = {
            "id": 100,
            "content": "A test comment",
            "post_input": self.post.pk,
        }

        self.url = reverse("comment-list")

    def test__get_comment_with_one_comment__returns_200(self):
        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), Comment.objects.count())

    def test__get_comment_with_multiple_comments__returns_200(self):
        comments_data = [
            Comment(content="A test2 comment", author=self.user, post=self.post),
            Comment(content="A test3 comment", author=self.user, post=self.post),
        ]

        Comment.objects.bulk_create(comments_data)

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), Comment.objects.count())

    def test__get_comment_with_no_comments__returns_200(self):
        Comment.objects.all().delete()

        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(data), Comment.objects.count())

    def test__create_comment_with_unauthenticated_user__returns_401(self):
        response = self.client.post(self.url, self.create_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Comment.objects.filter(pk=self.create_data["id"]).exists())

    def test__create_location_with_invalid_post_input__returns_400(self):
        self.client.force_authenticate(self.user)

        invalid_create_data = {
            "id": 100,
            "content": "A invalid comment",
            "post_input": 12902843,
        }

        response = self.client.post(self.url, invalid_create_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(Comment.objects.filter(pk=invalid_create_data["id"]).exists())


class TestCommentRetrieveUpdateDestroyAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bulgaria", code2="BG")
        self.city = City.objects.create(name="Sofia", country=self.country)

        self.super_user = User.objects.create_superuser(
            username="Super man", password="AdminPass", country=self.country
        )
        self.author = User.objects.create_user(
            username="Test", password="TestPass", country=self.country
        )
        self.normal_user = User.objects.create_user(
            username="Test2", password="TestPass2", country=self.country
        )

        self.post = Post.objects.create(
            title="Lost Cat",
            description="Lost it, please help me guys",
            city=self.city,
            author=self.author,
            image="https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg",
        )

        self.comment = Comment.objects.create(
            content="A test comment", author=self.author, post=self.post
        )

        self.update_data = {"content": "Edited test comment"}

        self.url = reverse("comment-details", kwargs={"pk": self.comment.pk})

    def test__get_comment__returns_200(self):
        response = self.client.get(self.url)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(data["content"], self.comment.content)
        self.assertEqual(data["author"]["id"], self.comment.author.pk)
        self.assertEqual(data["post"], self.comment.post.pk)

    def test__update_comment_as_unauthenticated_user__returns_401(self):
        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.comment.refresh_from_db()
        self.assertNotEqual(self.update_data["content"], self.comment.content)

    def test__delete_comment_as_unauthenticated_user__returns_401(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.assertTrue(Comment.objects.filter(pk=self.comment.pk).exists())

    def test__update_comment_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.comment.refresh_from_db()
        self.assertNotEqual(self.update_data["content"], self.comment.content)

    def test__delete_comment_as_normal_user__returns_403(self):
        self.client.force_authenticate(self.normal_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertTrue(Comment.objects.filter(pk=self.comment.pk).exists())

    def test__update_comment_as_author__returns_200(self):
        self.client.force_authenticate(self.author)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.comment.refresh_from_db()
        self.assertEqual(self.update_data["content"], self.comment.content)

    def test__delete_comment_as_author__returns_204(self):
        self.client.force_authenticate(self.author)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(Comment.objects.filter(pk=self.comment.pk).exists())

    def test__update_comment_as_admin__returns_200(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.patch(self.url, self.update_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.comment.refresh_from_db()
        self.assertEqual(self.update_data["content"], self.comment.content)

    def test__delete_comment_as_admin__returns_204(self):
        self.client.force_authenticate(self.super_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(Comment.objects.filter(pk=self.comment.pk).exists())
