from typing import Protocol, OrderedDict

from rest_framework_simplejwt import tokens

from users import repos


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

    @staticmethod
    def _send_letter_to_email(email: str) -> None:
        print(f'send letter to {email}')

    def create_token(self, data: OrderedDict):
        user = self.user_repos.get_user(data=data)
        access_token = tokens.AccessToken.for_user(user=user)
        refresh_token = tokens.RefreshToken.for_user(user=user)

        return {
            'access': str(access_token),
            'refresh': str(refresh_token)
        }
