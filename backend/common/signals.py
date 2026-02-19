from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Notification
from posts.models import PetLocation

from .choices import NotificationChoices

from .mails import send_location_added_mail


@receiver(post_save, sender=PetLocation)
def send_location_notification_to_user(sender, instance, created, **kwargs):
    if created:
        post = instance.post
        post_author = instance.post.author
        location_author = instance.author

        if post_author != location_author:
            Notification.objects.create(
                recipient=post_author,
                sender=location_author,
                notification_type=NotificationChoices.LOCATION,
                post_id=post.pk,
                text="added a new location to your",
            )

            send_location_added_mail(
                sender=location_author,
                recipient=post_author,
                post=post,
            )
