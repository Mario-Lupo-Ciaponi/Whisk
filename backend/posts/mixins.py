from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostModelSerializer

class PostAPIViewMixin:
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]