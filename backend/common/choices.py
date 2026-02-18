from django.db import models

class NotificationChoices(models.TextChoices):
    NOTIFICATION = "notification", "Notification"
    COMMENT = "comment", "Comment"