from django.db.models import TextChoices


class StatusChoices(TextChoices):
    NOT_FOUND = "not_found", "Not found"
    FOUND = "found", "Found"
