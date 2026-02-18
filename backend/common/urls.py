from django.urls import path, include
from . import views

urlpatterns = [
    path("cities/", views.CityListAPIView.as_view(), name="cities"),
    path("countries/", views.CountryListAPIView.as_view(), name="countries"),
    path("contact/", views.ContactAPIView.as_view(), name="contact"),
    path(
        "notifications/",
        include(
            [
                path(
                    "",
                    views.GetUnreadNotificationsAPIView.as_view(),
                    name="unread-notifications",
                ),
            ]
        ),
    ),
]
