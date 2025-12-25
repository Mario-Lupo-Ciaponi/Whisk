from django.urls import path, include
from .views import PostListView, PostApiView

urlpatterns = [
    path("", PostListView.as_view(), name="post-list"),
    path("<int:pk>/", PostApiView.as_view(), name="post-detail")
]
