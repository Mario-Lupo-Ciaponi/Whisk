from django.contrib.auth.models import AbstractUser
from django.db import models
from django_countries.fields import CountryField

class WhiskUser(AbstractUser):
    country = CountryField()
