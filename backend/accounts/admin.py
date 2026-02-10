from django.contrib import admin
from .models import WhiskUser, Profile


@admin.register(WhiskUser)
class WhiskUserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "email"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin): ...
