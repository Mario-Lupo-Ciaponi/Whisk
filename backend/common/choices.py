from django.db import models


class NotificationChoices(models.TextChoices):
    LOCATION = "location", "Location"
    COMMENT = "comment", "Comment"
