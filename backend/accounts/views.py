from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Profile
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()


class CurrentUserAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class RegisterApiView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
