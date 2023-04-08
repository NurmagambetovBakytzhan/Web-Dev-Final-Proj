from rest_framework import serializers
from . import models


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'password')


class VerifyUserSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    code = serializers.CharField(max_length=4)


#
class CreateTokenSerializer(serializers.Serializer):
    password = serializers.CharField()
    email = serializers.EmailField()


#
class GetUserSerializer(serializers.Serializer):
    token = serializers.CharField()
