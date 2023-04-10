from rest_framework import serializers

from . import models


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Movie
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Video
        fields = '__all__'


class MovieImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MovieImage
        fields = '__all__'
