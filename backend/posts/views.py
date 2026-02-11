from django.http import HttpRequest
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from django_filters import rest_framework as filter
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Post, PetLocation, Comment
from .serializers import (
    PostModelSerializer,
    PetLocationModelSerializer,
    CommentSerializer,
)
from common.permissions import IsOwnerOrSuperUser
from .filters import PostFilter
from .mixins import PostAPIViewMixin
from .pagination import PostResultsSetPagination

# TODO: add mixins for repeated code

# Post related views


class PostListCreateAPIView(PostAPIViewMixin, ListCreateAPIView):
    filter_backends = [filter.DjangoFilterBackend]
    filterset_class = PostFilter
    pagination_class = PostResultsSetPagination
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_queryset(self):
        post = Post.objects.all()

        if self.request.user.is_authenticated:
            post = post.filter(city__country=self.request.user.country)

        return post

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostRetrieveUpdateDestroyAPIView(PostAPIViewMixin, RetrieveUpdateDestroyAPIView):
    # Inherits IsAuthenticatedOrReadOnly permission then adds a custom one
    permission_classes = PostAPIViewMixin.permission_classes + [IsOwnerOrSuperUser]


class SavePostAPIView(APIView):
    def get_object(self, pk: int):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def post(self, request: HttpRequest, pk: int, format=None):
        user = request.user

        if user.is_authenticated:
            post = self.get_object(pk)

            if post.saved_by.filter(pk=user.pk).exists():
                post.saved_by.remove(user)

            else:
                post.saved_by.add(user)

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


# PetLocation related views


class PetLocationListCreateAPIView(ListCreateAPIView):
    queryset = PetLocation.objects.order_by("-is_valid", "created_at")
    serializer_class = PetLocationModelSerializer
    permission_classes = [
        AllowAny,
    ]  # TODO: add proper permission classes!

    def perform_create(self, serializer):
        """
        This checks if the POST request was made by an authenticated user.
        Anonymous users can also add a location.
        """

        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            serializer.save(author=None)


class PetLocationRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = PetLocation.objects.all()
    serializer_class = PetLocationModelSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsOwnerOrSuperUser,
    ]  # TODO: add permission that checks weather the user is the author of the post or location


# Comment related views


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = Comment.objects.order_by("-created_at")
    serializer_class = CommentSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsOwnerOrSuperUser,
    ]
