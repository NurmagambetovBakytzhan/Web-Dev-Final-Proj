from django.db import models


class UserTypeChoices(models.TextChoices):
    Viewer = 'Viewer'
    Admin = 'Admin'
    Author = 'Author'
