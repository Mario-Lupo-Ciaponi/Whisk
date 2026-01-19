from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters import rest_framework as filter
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Post, PetLocation
from .serializers import PostModelSerializer, PetLocationModelSerializer
from .filters import PostFilter

# TODO: add mixins for repeated code

class PostListCreateAPIView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    filter_backends = [filter.DjangoFilterBackend]
    filterset_class = PostFilter
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModelSerializer
    permission_classes = [AllowAny]


class PetLocationListCreateAPIView(ListCreateAPIView):
    queryset = PetLocation.objects.all()
    serializer_class = PetLocationModelSerializer
    permission_classes =  [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
