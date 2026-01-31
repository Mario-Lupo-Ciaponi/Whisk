from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters import rest_framework as filter
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Post, PetLocation
from .serializers import PostModelSerializer, PetLocationModelSerializer
from .permissions import IsOwner
from .filters import PostFilter
from .mixins import PostAPIViewMixin
from .pagination import PostResultsSetPagination

# TODO: add mixins for repeated code

class PostListCreateAPIView(PostAPIViewMixin, ListCreateAPIView):
    filter_backends = [filter.DjangoFilterBackend]
    filterset_class = PostFilter
    pagination_class = PostResultsSetPagination
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostRetrieveUpdateDestroyAPIView(PostAPIViewMixin, RetrieveUpdateDestroyAPIView):
    # Inherits IsAuthenticatedOrReadOnly permission then adds a custom one
    permission_classes = PostAPIViewMixin.permission_classes + [IsOwner]


class PetLocationListCreateAPIView(ListCreateAPIView):
    queryset = PetLocation.objects.all()
    serializer_class = PetLocationModelSerializer
    permission_classes =  [AllowAny,] # TODO: add proper permission classes!
    filter_backends = [filter.DjangoFilterBackend, ]
    filterset_fields = ["post",]

    def perform_create(self, serializer):
        """
        This checks if the POST request was made by an authenticated user.
        Anonymous users can also add a location.
        """

        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            serializer.save(author=None)
