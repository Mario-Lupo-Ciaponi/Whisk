from django.urls import path
from . import views

urlpatterns = [
    path("cities/", views.CityListAPIView.as_view(), name="cities"),
    path("countries/", views.CountryListAPIView.as_view(), name="countries"),
    path("contact", views.ContactAPIView.as_view(), name="contact"),
]
