from rest_framework.generics import ListAPIView

from cities_light.models import City

from .serializers import CitySerializer


class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
