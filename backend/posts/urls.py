from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.PostListCreateAPIView.as_view(), name="post-list"),
    path(
        "<int:pk>/",
        include(
            [
                path(
                    "",
                    views.PostRetrieveUpdateDestroyAPIView.as_view(),
                    name="post-details",
                ),
                path("save/", views.SavePostAPIView.as_view(), name="save-post"),
            ]
        ),
    ),
    path("saved/", views.SavePostListAPIView.as_view(), name="saved-posts-list"),
    path(
        "location/",
        include(
            [
                path(
                    "",
                    views.PetLocationListCreateAPIView.as_view(),
                    name="location-list",
                ),
                path(
                    "<int:pk>/",
                    views.PetLocationRetrieveUpdateDestroyAPIView.as_view(),
                    name="location-details",
                ),
            ]
        ),
    ),
    path(
        "comments/",
        include(
            [
                path("", views.CommentListCreateAPIView.as_view(), name="comment-list"),
                path(
                    "<int:pk>/",
                    views.CommentRetrieveUpdateDestroyAPIView.as_view(),
                    name="comment-details",
                ),
            ]
        ),
    ),
]
