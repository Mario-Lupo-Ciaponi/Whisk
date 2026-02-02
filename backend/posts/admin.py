from django.contrib import admin
from .models import Post, PetLocation, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "city", "author", "found",]
    list_filter = ["city", "found", "author",]
    ordering = ["posted_on",]



@admin.register(PetLocation)
class PetLocationAdmin(admin.ModelAdmin):
    list_display = ["latitude", "longitude", "is_valid"]
    list_filter = ["is_valid",]
