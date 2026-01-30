from rest_framework.generics import ListAPIView
from django_filters import rest_framework as filter

from cities_light.models import City, Country

from .serializers import CitySerializer, CountrySerializer


class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = [filter.DjangoFilterBackend]
    filterset_fields = ["country",]


class CountryListAPIView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
