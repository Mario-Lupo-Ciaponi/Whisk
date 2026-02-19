from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from common.mails import send_welcoming_mail
from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Create a Profile for a newly created User and send a welcome email.

    This receiver runs after a User is saved. If the User was just created,
    it will:
      - create an associated Profile instance,
      - send a welcoming email to the new user.

    Args:
        sender: The model class (User).
        instance: The saved User instance.
        created (bool): True if the instance was created (not updated).
        **kwargs: Additional keyword arguments provided by Django signals.
    """
    if created:
        Profile.objects.create(user=instance)

        send_welcoming_mail(instance)
