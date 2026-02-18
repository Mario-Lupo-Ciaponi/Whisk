from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Notification
from posts.models import PetLocation

from .choices import NotificationChoices


@receiver(post_save, sender=PetLocation)
def send_location_notification_to_user(sender, instance, created, **kwargs):
    if created:
        if instance.post.author != instance.user:
            Notification.objects.create(
                recipient=instance.post.author,
                sender=instance.user,
                notification_type=NotificationChoices.LOCATION,
                post_id=instance.post.pk,
                text=f"{instance.author} added a new location!",
            )