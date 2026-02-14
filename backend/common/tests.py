from rest_framework.test import APITestCase
from rest_framework import  status
from django.core import mail
from django.urls import reverse


class TestContactAPIView(APITestCase):
    def setUp(self):
        self.data = {
            "subject": "Test subject",
            "email": "test.mail@testmails.com",
            "message": "This is just a Test mail so it has no real purposes other than testing."
        }

        self.invalid_data = {
            "subject": "Test subject",
            "email": "test.mail",
            "message": "This is just a Test mail so it has no real purposes other than testing."
        }

        self.url = reverse("contact")

    def test__send_contact_email_with_valid_data__returns_200(self):
        response = self.client.post(self.url, self.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, self.data["subject"])


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
