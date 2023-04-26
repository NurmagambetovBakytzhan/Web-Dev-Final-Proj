from rest_framework import serializers

from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())


    class Meta:
        model = models.Movie
        # fields = ('title', 'author', 'description', 'age_limit', 'image', 'category')
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Video
        fields = '__all__'


class MovieImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MovieImage
        fields = ('file', 'movie')
