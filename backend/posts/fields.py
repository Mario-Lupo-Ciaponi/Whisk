from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class CoordinatesField(models.DecimalField):
    description = "Coordinates in the format of Latitude and Longitude"

    def __init__(self, *args, **kwargs):
        kwargs["max_digits"] = 9
        kwargs["decimal_places"] = 6

        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()

        del kwargs["max_digits"]
        del kwargs["decimal_places"]

        return name, path, args, kwargs
