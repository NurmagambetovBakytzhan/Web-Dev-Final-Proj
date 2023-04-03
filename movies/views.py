from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

# Create your views here.
from . import serializers, models
from .models import Video


class MovieImageViewSet(ModelViewSet):
    serializer_class = serializers.MovieImageSerializer
    queryset = models.MovieImage.objects.all()


class MovieViewSet(ModelViewSet):
    serializer_class = serializers.MovieSerializer
    queryset = models.Movie.objects.all()
    permission_classes = (IsAuthenticated,)


class VideoViewSet(ModelViewSet):
    serializer_class = serializers.VideoSerializer
    queryset = models.Video.objects.all()


# def VideoPlayer(request, video_id):
#     video = Video.objects.get(id=video_id)
#     context = {'video': video}
#     return render(request, 'video_player.html', context)
