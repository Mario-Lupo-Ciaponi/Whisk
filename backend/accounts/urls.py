from django.urls import path, include
from . import views

urlpatterns = [
    path("register/", views.RegisterApiView.as_view(), name="register"),
    path("me/", views.CurrentUserAPIView.as_view(), name="me"),
    path("user/<int:pk>/", views.UserRetrieveAPIView.as_view(), name="user"),
    path("profile/<int:pk>/", views.ProfileUpdateAPIView.as_view(), name="profile"),
]
