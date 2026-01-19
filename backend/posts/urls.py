from django.urls import path, include
from .views import PostListCreateAPIView, PostRetrieveUpdateDestroyAPIView, PetLocationListCreateAPIView

urlpatterns = [
    path("", PostListCreateAPIView.as_view(), name="post-list"),
    path("<int:pk>/", PostRetrieveUpdateDestroyAPIView.as_view(), name="post-detail"),
    path("location/", include([
        path("", PetLocationListCreateAPIView.as_view(), name="location-list"),
    ])),
]
