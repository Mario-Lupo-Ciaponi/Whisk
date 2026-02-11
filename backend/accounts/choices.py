from django.db import models


class AccountTypeChoices(models.TextChoices):
    NO_TYPE = "no type", "Do not specify"
    PET_OWNER = "pet owner", "Pet owner"
    VOLUNTEER = "volunteer", "Volunteer"
    SHELTER = "shelter", "Shelter"
