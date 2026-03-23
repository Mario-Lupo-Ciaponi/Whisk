from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostModelSerializer


class PostAPIViewMixin:
    queryset = Post.objects.select_related(
        'author', 'author__profile', 'author__country', 'city', 'city__country'
    ).prefetch_related(
        'locations', 'locations__author', 'comments', 'comments__author', 'saved_by'
    )
    serializer_class = PostModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
