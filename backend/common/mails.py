from django.core.mail import send_mail
from config.settings import EMAIL_HOST_USER


def send_welcoming_mail(user):
    message = """
                Welcome to the pack! We are so glad you’ve joined our community of pet lovers. 
                By registering, you’ve just added another pair of watchful eyes to the neighborhood, 
                helping us keep every pet safe and every family whole.\n
                Whether you're here to help others or just want to be part of our local safety net, 
                your presence makes a real difference. Log in now to complete your profile, pin your 
                location, and help us build a world where no pet stays lost for long. We’re happy 
                to have you with us!
            """

    send_mail(
        f"Welcome, {user.username}!",
        message,
        EMAIL_HOST_USER,
        [user.email],
    )


def send_location_added_mail(sender, recipient, post):
    sender_username = sender.username if sender else "Anonymous user"

    subject = f"{sender_username} added a new location to your post: {post.title}"

    message = (
        f"Hi {recipient.username},\n\n"
        f"{sender_username} has added a new location to your post titled \"{post.title}\".\n\n"
        f"Take a moment to review the updated location details — this could help you track down your pet.\n\n"
        f"Wishing you the best,\n"
        f"The Team"
    )

    send_mail(
        subject,
        message,
        EMAIL_HOST_USER,
        recipient_list=[recipient.email],
    )


def send_comment_added_mail(sender, recipient, post):
    sender_username = sender.username if sender else "Anonymous user"

    subject = f"{sender_username} commented on your post: {post.title}"

    message = (
        f"Hi {recipient.username},\n\n"
        f"{sender_username} has just left a comment on your post titled \"{post.title}\".\n\n"
        f"Sign in to your account to read the comment and join the conversation.\n\n"
        f"Best regards,\n"
        f"The Team"
    )

    send_mail(
        subject,
        message,
        EMAIL_HOST_USER,
        recipient_list=[recipient.email],
    )


def send_contact_email(subject, email, message):
    email_subject = f"Email from {email}"
    email_message = (
        f"You have got a message from {email}\nMessage:\n{subject}\n{message}"
    )

    send_mail(subject, message, EMAIL_HOST_USER, ["mario.lupo.ciaponi08@gmail.com"])
