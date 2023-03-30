import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
AGE_CHOICES = (
    ('All', 'All'),
    ('Kids', 'Kids'),
)

class CustomUser(AbstractUser):
    profiles = models.ManyToManyField('Profile', blank=True)

class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    age_limit = models.CharField(choices=AGE_CHOICES, max_length=10)

    def __str__(self):
        return self.name

