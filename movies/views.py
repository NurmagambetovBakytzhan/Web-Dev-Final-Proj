from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# Create your views here.
from . import serializers, models
from .models import Video, Movie


class MovieImageViewSet(ModelViewSet):
    serializer_class = serializers.MovieImageSerializer
    queryset = models.MovieImage.objects.all()


class MovieViewSet(ModelViewSet):
    serializer_class = serializers.MovieSerializer
    queryset = models.Movie.objects.all()

    permission_classes = (IsAuthenticated,)

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


# def VideoPlayer(request, video_id):
#     video = Video.objects.get(id=video_id)
#     context = {'video': video}
#     return render(request, 'video_player.html', context)
