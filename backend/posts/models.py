from django.db import models
from django.utils import timezone

from .choices import StatusChoices


class Post(models.Model):
    title = models.CharField(
        max_length=100,
    )
    description = models.TextField()
    city = models.CharField(
        max_length=70,
    )
    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.NOT_FOUND,
    )
    posted_on = models.DateTimeField(
        auto_now_add=True,
    )
    # TODO: add author field
