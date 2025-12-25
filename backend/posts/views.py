from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from .models import Post
from .serializers import PostModelSerializer


class PostListView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    # Test only:
    permission_classes = [AllowAny]


class PostApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    permission_classes = [AllowAny]
