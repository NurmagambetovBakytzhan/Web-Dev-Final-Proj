import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from users import choises

# Create your models here.
AGE_CHOICES = (
    ('All', 'All'),
    ('Kids', 'Kids'),
)


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None, user_type: str = None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            is_active=True,
            user_type=user_type
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, blank=True, null=True)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    email = models.EmailField(verbose_name="Email", unique=True)
    user_type = models.CharField(
        max_length=15,
        choices=choises.UserTypeChoices.choices,
        blank=True,
        null=True,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    profiles = models.ManyToManyField('Profile', blank=True)
    objects = CustomUserManager()


class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    age_limit = models.CharField(choices=AGE_CHOICES, max_length=10)

    def __str__(self):
        return self.name
