from django.db import models


class Post(models.Model):
    title = models.CharField(
        max_length=100,
    )
    description = models.TextField()
    city = models.CharField(
        max_length=70,
    )
