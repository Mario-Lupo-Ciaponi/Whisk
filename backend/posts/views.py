from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filter

from .models import Post
from .serializers import PostModelSerializer
from .filters import PostFilter


class PostListView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    filter_backends = [filter.DjangoFilterBackend]
    filterset_class = PostFilter
    # Test only:
    permission_classes = [AllowAny]


class PostApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    # Test only:
    permission_classes = [AllowAny]
