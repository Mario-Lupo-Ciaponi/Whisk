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


def send_contact_email(subject, email, message):
    email_subject = f"Email from {email}"
    email_message = (
        f"You have got a message from {email}\nMessage:\n{subject}\n{message}"
    )

    send_mail(subject, message, EMAIL_HOST_USER, ["mario.lupo.ciaponi08@gmail.com"])
