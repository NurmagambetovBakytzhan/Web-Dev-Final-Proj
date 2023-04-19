from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from . import serializers, services, models


# Create your views here.
class UserViewSet(ViewSet):
    user_services: services.UserServicesInterface = services.UserServicesV1()
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)
    
    def create_user(self, request, *args, **kwargs):
        serializer = serializers.CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # to check whether it's true

        data = self.user_services.create_user(data=serializer.validated_data)

        return Response(data, status=status.HTTP_201_CREATED)

    def verify_user(self, request, *args, **kwargs):
        print(request.user)
        serializer = serializers.VerifyUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.user_services.verify_user(data=serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def verify_token(self, request, *args, **kwargs):
        serializer = serializers.VerifyUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tokens = self.user_services.verify_token(data=serializer.validated_data)

        return Response(tokens)

    def create_token(self, request, *args, **kwargs):
        serializer = serializers.CreateTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tokens = self.user_services.create_token(data=serializer.validated_data)
        return Response(tokens)

    def get_user(self, request, *args, **kwargs):
        serializer = serializers.GetUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access_token = Token.objects.get(key=serializer.validated_data['access_token'])
        refresh_token = Token.objects.get(key=serializer.validated_data['refresh'])
        user_id = access_token['user_id']
        user = models.CustomUser.objects.get(id=user_id)
        return Response({
            "user": user
        })
