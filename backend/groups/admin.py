from django.contrib import admin
from .models import CityGroup


@admin.register(CityGroup)
class CityGroupAdmin(admin.ModelAdmin): ...
