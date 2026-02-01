from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from cloudinary.models import CloudinaryField

from .fields import CoordinatesField


User = get_user_model()


class Post(models.Model):
    title = models.CharField(
        max_length=100,
    )
    description = models.TextField()
    city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.CASCADE,
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
    image = CloudinaryField(
        "image",
    )

    class Meta:
        ordering = ["posted_on",]

    def __str__(self):
        return f"{self.title} - {self.author.username}"


class PetLocation(models.Model):
    latitude = CoordinatesField(
        validators=[
            MaxValueValidator(90),
            MinValueValidator(-90),
        ],
    )
    longitude = CoordinatesField(
        validators=[
            MaxValueValidator(180),
            MinValueValidator(-180),
        ],
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    author = models.ForeignKey(
        User,
        related_name="gave_locations",
        on_delete=models.SET_NULL,
        null=True,
    )
    post = models.ForeignKey(
        Post,
        related_name="locations",
        on_delete=models.CASCADE,
    )
    is_valid = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return  f"{self.longitude}, {self.latitude} seen on {self.created_at}"


class Comment(models.Model):
    content = models.CharField(
        max_length=100,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments_created",
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="comments",
    )

    def __str__(self):
        snippet = (self.content[:20] + "...") if len(self.content) > 20 else self.content
        return f"{self.author.username}: {snippet}"
