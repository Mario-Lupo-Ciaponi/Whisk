from django.shortcuts import render
from rest_framework import generics

from .models import CityGroup
from .serializers import CityGroupSerializer


class CityGroupListCreateAPIView(generics.ListCreateAPIView):
    queryset = CityGroup.objects.all()
    serializer_class = CityGroupSerializer
