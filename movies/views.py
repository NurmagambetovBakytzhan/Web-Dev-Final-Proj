from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# Create your views here.
from . import serializers, models

from . import permissions

from .models import Video, Movie
from .permissions import IsAdminOrReadOnly


class CategoryViewSet(ModelViewSet):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


class MovieImageViewSet(ModelViewSet):
    serializer_class = serializers.MovieImageSerializer
    queryset = models.MovieImage.objects.all()




class MovieViewSet(ModelViewSet):
    serializer_class = serializers.MovieSerializer
    queryset = models.Movie.objects.all()

    permission_classes = [IsAdminOrReadOnly,]

    @action(detail=True, methods=['GET'])
    def details(self, request, *args, **kwargs):
        movie = self.get_object()
        videos = movie.movie_video.all()
        images = movie.movie_images.all()

        data = {
            'movie': self.serializer_class(movie).data,
            'videos': serializers.VideoSerializer(videos, many=True).data,
            'images': serializers.MovieImageSerializer(images, many=True).data
        }
        return Response(data)


class VideoViewSet(ModelViewSet):
    serializer_class = serializers.VideoSerializer
    queryset = models.Video.objects.all()

