from typing import Protocol, OrderedDict

from rest_framework.generics import get_object_or_404

from users import models


class UserReposInterface(Protocol):
    def create_user(self, data: OrderedDict) -> models.CustomUser:
        ...

    def get_user(self, data: OrderedDict) -> models.CustomUser:
        ...


class UserReposV1:
    model = models.CustomUser

    def create_user(self, data: OrderedDict) -> models.CustomUser:
        return self.model.objects.create_user(**data)

    @staticmethod
    def get_user(data: OrderedDict) -> models.CustomUser:
        return get_object_or_404(models.CustomUser, **data)
