from rest_framework.test import APITestCase
from rest_framework import status

from django.core import mail
from django.urls import reverse

from django.contrib.auth import get_user_model
from cities_light.models import Country

from .models import Notification
from .choices import NotificationChoices


class TestContactAPIView(APITestCase):
    def setUp(self):
        self.data = {
            "subject": "Test subject",
            "email": "test.mail@testmails.com",
            "message": "This is just a Test mail so it has no real purposes other than testing.",
        }

        self.invalid_data = {
            "subject": "Test subject",
            "email": "test.mail",
            "message": "This is just a Test mail so it has no real purposes other than testing.",
        }

        self.url = reverse("contact")

    def test__send_contact_email_with_valid_data__returns_200(self):
        response = self.client.post(self.url, self.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, f"Email from {self.data['email']}")

    def test__send_contact_email_with_invalid_email__returns_400(self):
        response = self.client.post(self.url, self.invalid_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(len(mail.outbox), 0)

    def test__send_contact_email_with_missing_message__returns_400(self):
        missing_data = {
            "subject": "Test subject",
            "email": "test.mail@testmails.com",
        }

        response = self.client.post(self.url, missing_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(len(mail.outbox), 0)
        self.assertIn("message", response.data)


class TestGetUnreadNotificationsAPIView(APITestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Test Country")

        User = get_user_model()
        self.user1 = User.objects.create_user(
            username="user1",
            email="user1@example.com",
            password="testpassword1",
            first_name="User",
            last_name="One",
            country=self.country,
        )
        self.user2 = User.objects.create_user(
            username="user2",
            email="user2@example.com",
            password="testpassword2",
            first_name="User",
            last_name="Two",
            country=self.country,
        )
        self.url = reverse("unread-notifications")

    def create_notification(self, recipient, is_read=False):
        return Notification.objects.create(
            recipient=recipient,
            notification_type=NotificationChoices.choices[0][0] if len(NotificationChoices.choices) > 0 else 'test',
            text="Test notification text",
            is_read=is_read,
        )

    def test__unauthenticated_request__returns_401_or_403(self):
        response = self.client.get(self.url)

        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test__request_by_user_with_no_notifications__returns_empty_list(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test__request_by_user_with_only_unread_notifications__returns_notifications(self):
        self.create_notification(recipient=self.user1, is_read=False)
        self.create_notification(recipient=self.user1, is_read=False)

        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test__request_by_user_with_read_and_unread_notifications__returns_only_unread(self):
        self.create_notification(recipient=self.user1, is_read=False)
        self.create_notification(recipient=self.user1, is_read=True)

        self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["is_read"], False)

    def test__request_by_user__does_not_return_other_users_notifications(self):
        self.create_notification(recipient=self.user1, is_read=False)
        self.create_notification(recipient=self.user2, is_read=False)

        self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
