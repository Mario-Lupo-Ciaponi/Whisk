"""
Signal handlers for creating Notification records and sending notification emails.

This module defines Django signal receivers that react to the creation of
PetLocation and Comment instances. When a new location or comment is created
by a user other than the post author, a Notification is created for the post
author and a notification email is sent asynchronously.
"""

import threading
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Notification
from posts.models import PetLocation, Comment

from .choices import NotificationChoices

from .mails import send_location_added_mail, send_comment_added_mail


@receiver(post_save, sender=PetLocation)
def send_location_notification_to_user(sender, instance, created, **kwargs):
    """
    Handle post-save signals for PetLocation.

    If a PetLocation was just created and its author is not the author of the
    related post, create a Notification for the post author and send an email
    to inform them that a new location was added.

    Args:
        sender: The model class (PetLocation).
        instance: The saved PetLocation instance.
        created (bool): True if the instance was created (not updated).
        **kwargs: Additional keyword arguments passed by Django signals.
    """
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

            email_args = (location_author, post_author, post)
            threading.Thread(target=send_location_added_mail, args=email_args).start()


@receiver(post_save, sender=Comment)
def send_comment_notification_to_user(sender, instance, created, **kwargs):
    """
    Handle post-save signals for Comment.

    If a Comment was just created and its author is not the author of the
    related post, create a Notification for the post author and send an email
    to inform them that a new comment was added.

    Args:
        sender: The model class (Comment).
        instance: The saved Comment instance.
        created (bool): True if the instance was created (not updated).
        **kwargs: Additional keyword arguments passed by Django signals.
    """
    if created:
        post = instance.post
        post_author = instance.post.author
        comment_author = instance.author

        if post_author != comment_author:
            Notification.objects.create(
                recipient=post_author,
                sender=comment_author,
                notification_type=NotificationChoices.COMMENT,
                post_id=post.pk,
                text="commented on your",
            )

            email_args = (comment_author, post_author, post)
            threading.Thread(target=send_comment_added_mail, args=email_args).start()
