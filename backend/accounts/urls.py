from django.urls import path, include
from . import views

urlpatterns = [
    path("register/", views.RegisterApiView.as_view(), name="register"),
    path("me/", views.CurrentUserAPIView.as_view(), name="me"),
]
