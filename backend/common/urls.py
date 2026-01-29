from django.urls import path
from . import views

urlpatterns = [
    path("cities/", views.CityListAPIView.as_view(), name="cities"),
]
