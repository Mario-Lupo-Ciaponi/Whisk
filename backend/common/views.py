from rest_framework.generics import ListAPIView
from rest_framework import status
from django_filters import rest_framework as filter

from cities_light.models import City, Country
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CitySerializer, CountrySerializer, ContactSerializer
from .mails import send_contact_email


class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = [filter.DjangoFilterBackend]
    filterset_fields = [
        "country",
    ]


class CountryListAPIView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class ContactAPIView(APIView):
    def post(self, request, format=None):
        serializer = ContactSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            subject = data.get("subject")
            email = data.get("email")
            message = data.get("message")

            send_contact_email(subject=subject, email=email, message=message)

            return Response({"details": "Success"}, status.HTTP_200_OK)

        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
