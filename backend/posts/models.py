from django.contrib.auth import get_user_model
from django.db import models

from .validators import ProfanityCheckValidator


User = get_user_model()


class Post(models.Model):
    title = models.CharField(
        max_length=100,
     )
    description = models.TextField()
    city = models.CharField(
        max_length=70,
    )
    found = models.BooleanField(
        default=False,
    )
    posted_on = models.DateTimeField(
        auto_now_add=True,
    )
    author = models.ForeignKey(
        User,
        related_name="posts",
        on_delete=models.CASCADE,
    )
