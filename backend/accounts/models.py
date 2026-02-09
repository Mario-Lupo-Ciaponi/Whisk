from django.contrib.auth.models import AbstractUser
from django.db import models

from cloudinary.models import CloudinaryField

from .choices import AccountTypeChoices


# NOTE: After creation a signal triggers that create a profile
class WhiskUser(AbstractUser):
    country = models.ForeignKey(
        "cities_light.Country",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(
        WhiskUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    profile_image = CloudinaryField(
        "image",
        null=True,
        blank=True,
    )
    bio = models.TextField(
        null=True,
        blank=True,
    )
    account_type = models.CharField(
        max_length=10,
        choices=AccountTypeChoices.choices,
        null=True,
        blank=True,
    )
    city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.user.username
