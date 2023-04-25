from rest_framework import serializers
from . import models


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'password', 'user_type')


class VerifyUserSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    code = serializers.CharField(max_length=4)


class CreateTokenSerializer(serializers.Serializer):
    password = serializers.CharField()
    email = serializers.EmailField()


#
class GetUserSerializer(serializers.Serializer):
    access_token = serializers.CharField()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('id', 'first_name', 'last_name', 'email', 'user_type', 'is_superuser')
