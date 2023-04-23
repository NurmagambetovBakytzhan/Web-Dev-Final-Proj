import random
import uuid
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

    def create_user(self, data: OrderedDict) -> dict:
        session_id = self._verify_email(data=data)

        return {
            'session_id': session_id,
        }

    def create_token(self, data: OrderedDict):
        user = self.user_repos.get_user(data=data)
        access_token = tokens.AccessToken.for_user(user=user)
        refresh_token = tokens.RefreshToken.for_user(user=user)

        return {
            'access_token': str(access_token),
            'refresh_token': str(refresh_token),
        }

    def verify_user(self, data: OrderedDict) -> dict | None:
        user_data = cache.get(data['session_id'])

        if not user_data:
            return

        if data['code'] != user_data['code']:
            return

        user = self.user_repos.create_user(data={
            'email': user_data['email'],
            'password': user_data['password'],
            'user_type': user_data['user_type']
        })
        # self._send_letter_to_email(email=user.email)

    def _verify_email(self, data: OrderedDict, is_exists: bool = False) -> str:
        email = data['email']

        if is_exists:
            user = self.user_repos.get_user(data)
            email = str(user.email)

        code = self._generate_code()
        session_id = self._generate_session_id()
        cache.set(session_id, {'email': email, 'code': code, **data}, timeout=300)
        self._send_letter_to_email(email, code)
        return session_id

    @staticmethod
    def _send_letter_to_email(email: str, code: str) -> None:
        send_mail(
            subject='Verification Code',
            message=f'Here is your code -> {code}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email]
        )

    @staticmethod
    def _generate_code(length: int = 4) -> str:
        numbers = [str(i) for i in range(10)]
        return ''.join(random.choices(numbers, k=length))

    @staticmethod
    def _generate_session_id() -> str:
        return str(uuid.uuid4())
