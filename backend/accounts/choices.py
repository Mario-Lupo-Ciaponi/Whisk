from django.db import models

class AccountTypeChoices(models.TextChoices):
    PET_OWNER = "Pet owner", "Pet owner"
    VOLUNTEER = "Volunteer", "Volunteer"
    RESCUE = "Shelter", "Shelter"