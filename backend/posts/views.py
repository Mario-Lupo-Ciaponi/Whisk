from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    AllowAny,
    IsAuthenticated,
)
from rest_framework.filters import OrderingFilter
from django_filters import rest_framework as filter
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Post, PetLocation, Comment
from .serializers import (
    PostModelSerializer,
    PetLocationModelSerializer,
    CommentSerializer,
)
from .filters import PostFilter
from .mixins import PostAPIViewMixin
from .pagination import PostResultsSetPagination
from .throttles import LocationCreateThrottle, LocationCreateAnonThrottle
from .utils import get_image_base64_from_url, get_mimetype_from_url, analyze_image

from common.permissions import IsOwnerOrSuperUser


# Post related views

class PostListCreateAPIView(PostAPIViewMixin, ListCreateAPIView):
    filter_backends = [
        filter.DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_class = PostFilter
    ordering_fields = ["posted_on"]
    pagination_class = PostResultsSetPagination
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_queryset(self):
        post = Post.objects.select_related(
            'author', 'author__profile', 'author__country', 'city', 'city__country'
        ).prefetch_related(
            'locations', 'locations__author', 'comments', 'comments__author', 'saved_by'
        )

        if self.request.user.is_authenticated:
            post = post.filter(city__country=self.request.user.country)

        return post

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)

        if post.image:
            try:
                image_base64 = get_image_base64_from_url(post.image.url)
                mime_type = get_mimetype_from_url(post.image.url)

                animal_type = analyze_image(image_base64, mime_type)

                post.animal_type = animal_type
                post.save()
            except Exception as e:
                post.animal_type = None


class PostRetrieveUpdateDestroyAPIView(PostAPIViewMixin, RetrieveUpdateDestroyAPIView):
    # Inherits IsAuthenticatedOrReadOnly permission then adds a custom one
    permission_classes = PostAPIViewMixin.permission_classes + [IsOwnerOrSuperUser]


class SavePostAPIView(APIView):
    def get_object(self, pk: int):
        post = get_object_or_404(Post, pk=pk)

        return post

    def post(self, request: HttpRequest, pk: int, format=None):
        user = request.user

        if user.is_authenticated:
            post = self.get_object(pk)
            is_saved = post.saved_by.filter(pk=user.pk).exists()

            if is_saved:
                post.saved_by.remove(user)
            else:
                post.saved_by.add(user)

            return Response({"save": not is_saved}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SavePostListAPIView(ListAPIView):
    serializer_class = PostModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PostResultsSetPagination

    def get_queryset(self):
        user = self.request.user

        return Post.objects.select_related(
            'author', 'author__profile', 'author__country', 'city', 'city__country'
        ).prefetch_related(
            'locations', 'locations__author', 'comments', 'comments__author', 'saved_by'
        ).filter(saved_by=user)


# PetLocation related views


class PetLocationListCreateAPIView(ListCreateAPIView):
    queryset = PetLocation.objects.select_related('post', 'author').order_by("-is_valid", "created_at")
    serializer_class = PetLocationModelSerializer
    permission_classes = [
        AllowAny,
    ]

    def get_throttles(self):
        if self.request.method == "POST" or not self.request.user.is_staff:
            return [
                LocationCreateThrottle(),
                LocationCreateAnonThrottle(),
            ]

        return []

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
    queryset = PetLocation.objects.select_related('post', 'author').all()
    serializer_class = PetLocationModelSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsOwnerOrSuperUser,
    ]


# Comment related views


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = Comment.objects.select_related('author', 'post').order_by("-created_at")
    serializer_class = CommentSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.select_related('author', 'post').all()
    serializer_class = CommentSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsOwnerOrSuperUser,
    ]
