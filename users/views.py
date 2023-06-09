from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from . import serializers, services, models


# Create your views here.
class UserViewSet(ViewSet):
    user_services: services.UserServicesInterface = services.UserServicesV1()

    def create_user(self, request, *args, **kwargs):
        serializer = serializers.CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # to check whether it's true

        self.user_services.create_user(data=serializer.validated_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create_token(self, request, *args, **kwargs):
        serializer = serializers.CreateTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tokens = self.user_services.create_token(data=serializer.validated_data)
        return Response(tokens)

    def verify_token(self, request, *args, **kwargs):
        serializer = serializers.VerifyUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tokens = self.user_services.verify_token(data=serializer.validated_data)

        return Response(tokens)

    def get_user(self, request, *args, **kwargs):
        serializer = serializers.GetUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access_token = Token.objects.get(key=serializer.validated_data['token'])
        refresh_token = Token.objects.get(key=serializer.validated_data['token'])

        return Response({
            'email': access_token.user.email,
        })

    def verify_user(self,request, *args, **kwargs):
        serializer = serializers.VerifyUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.user_services.verify_user(data=serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

