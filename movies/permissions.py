from rest_framework.permissions import DjangoObjectPermissions, BasePermission, SAFE_METHODS
from users import choises as user_choises

from . import models

# class IsSubscribed(DjangoObjectPermissions):
#
#     def has_object_permission(self, request, view, obj: models.Movie):
#         return obj.u


class IsAdminOrReadOnly(BasePermission):
    """
    Allows authenticated users to access GET requests,
    but restricts all other requests to only administrators.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.user_type == user_choises.UserTypeChoices.Author

class IsAdminOrAuthor(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and (request.user.user_type == user_choises.UserTypeChoices.Author)
        )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user