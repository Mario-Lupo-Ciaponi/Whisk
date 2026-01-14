from django.urls import path, include

from . import views

urlpatterns = [
    path("", views.CityGroupListCreateAPIView.as_view(), name="city-group-list-create"),
]
