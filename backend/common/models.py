from django.contrib.auth import get_user_model
from django.db import models
from .choices import NotificationChoices

User = get_user_model()


class Notification(models.Model):
    recipient = models.ForeignKey(
        User,
        related_name="notifications",
        on_delete=models.CASCADE,
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    notification_type = models.CharField(
        max_length=20,
        choices=NotificationChoices.choices,
    )
    post_id = models.IntegerField(
        null=True,
        blank=True,
    )
    text = models.TextField()
    is_read = models.BooleanField(
        default=False,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = [
            "-created_at",
        ]
