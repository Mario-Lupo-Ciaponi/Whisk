from django.contrib.auth.models import AbstractUser
from django.db import models

class WhiskUser(AbstractUser):
    country = models.ForeignKey(
        "cities_light.Country",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.username
