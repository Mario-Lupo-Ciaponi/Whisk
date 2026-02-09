from django.db import models


class AccountTypeChoices(models.TextChoices):
    PET_OWNER = "pet owner", "Pet owner"
    VOLUNTEER = "volunteer", "Volunteer"
    SHELTER = "shelter", "Shelter"
