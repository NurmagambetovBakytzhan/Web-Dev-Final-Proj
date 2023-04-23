from rest_framework.permissions import DjangoObjectPermissions, BasePermission
from users import choises as user_choises

from . import models

# class IsSubscribed(DjangoObjectPermissions):
#
#     def has_object_permission(self, request, view, obj: models.Movie):
#         return obj.u


class IsAdminOrAuthor(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and request.is_authenticated
            and (request.user.user_type == user_choises.UserTypeChoices.Author or request.user.user_type == user_choises.UserTypeChoices.Admin)
        )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user