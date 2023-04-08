from rest_framework.permissions import DjangoObjectPermissions

from . import models

# class IsSubscribed(DjangoObjectPermissions):
#
#     def has_object_permission(self, request, view, obj: models.Movie):
#         return obj.u