from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny

from .models import CityGroup
from .serializers import CityGroupSerializer


class CityGroupListCreateAPIView(generics.ListCreateAPIView):
    queryset = CityGroup.objects.all()
    serializer_class = CityGroupSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
