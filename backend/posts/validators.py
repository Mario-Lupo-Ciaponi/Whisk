from django.utils.deconstruct import deconstructible
from rest_framework import serializers
from profanity_check import predict, predict_prob


@deconstructible
class ProfanityCheckValidator:
    """
    Validator for checking if the given string value contains profanity words.
    """
    def __init__(self, message: str=None):
        self.message = message or "Profanity is not allowed!"

    def __call__(self, value: str):
        if predict([value]):
            raise serializers.ValidationError({"profanity_error": self.message})
