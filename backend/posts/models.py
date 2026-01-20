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
    date_seen = models.DateTimeField(
        auto_now_add=True,
    )
    author = models.ForeignKey(
        User,
        related_name="gave_locations",
        on_delete=models.SET_NULL,
        null=True,
    )
    posts = models.ManyToManyField(
        Post,
        related_name="locations",
    )

    def __str__(self):
        return  f"{self.latitude}, {self.latitude} seen on {self.date_seen}"
