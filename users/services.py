from typing import Protocol, OrderedDict

from django.conf import settings
from django.core.cache import cache
from rest_framework_simplejwt import tokens

from users import repos

from django.core.mail import send_mail


class UserServicesInterface(Protocol):

    def create_user(self, data: OrderedDict) -> dict:
        ...

    def verify_user(self, data: OrderedDict) -> dict:
        ...

    def create_token(self, data: OrderedDict) -> dict:
        ...

    def verify_token(self, data: OrderedDict) -> dict:
        ...


class UserServicesV1:
    user_repos: repos.UserReposInterface = repos.UserReposV1()

    def create_user(self, data: OrderedDict) -> None:
        user = self.user_repos.create_user(data=data)
        self._send_letter_to_email(email=user.email)

    def create_token(self, data: OrderedDict):
        user = self.user_repos.get_user(data=data)
        access_token = tokens.AccessToken.for_user(user=user)
        refresh_token = tokens.RefreshToken.for_user(user=user)

        return {
            'access_token': str(access_token),
            'refresh_token': str(refresh_token)
        }

    def verify_user(self, data: OrderedDict) -> dict:
        user_data = cache.get(data['session_id'])

        if not user_data:
            return

        if data['code'] != user_data['code']:
            return

        user = self.user_repos.create_user(data={
            'email': user_data['email'],
            'password': user_data['password']
        })
        self._send_letter_to_email(email=user.email)

    @staticmethod
    def _send_letter_to_email(email: str) -> None:
        send_mail(
            subject='vhjk',
            message='hi',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email]
        )

    @staticmethod
    def _verify_email(data: OrderedDict):
        pass
