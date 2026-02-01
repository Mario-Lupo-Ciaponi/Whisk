from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.PostListCreateAPIView.as_view(), name="post-list"),
    path("<int:pk>/", views.PostRetrieveUpdateDestroyAPIView.as_view(), name="post-details"),
    path("location/", include([
        path("", views.PetLocationListCreateAPIView.as_view(), name="location-list"),
        path("<int:pk>/", views.PetLocationRetrieveUpdateDestroyAPIView.as_view(), name="location-details"),
    ])),
    path("comments/", include([
        path("", views.CommentListCreateAPIView.as_view(), name="comment-list"),
        path("<int:pk>/", views.CommentRetrieveUpdateDestroyAPIView.as_view(), name="comment-details"),
    ])),
]
