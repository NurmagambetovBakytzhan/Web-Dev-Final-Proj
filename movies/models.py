import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _  # Needed for translation and localisation
from users import models as user_models


# Create your models here.
class Category(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:

        verbose_name = _('Category')
        verbose_name_plural = _('Categories')


class Movie(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=100, verbose_name=_('Title'), unique=True)
    description = models.TextField(blank=True, null=True, verbose_name=_('Description'))

    is_top = models.BooleanField(default=False, verbose_name=_('Is Top?'))
    age_limit = models.CharField(choices=user_models.AGE_CHOICES, max_length=10, verbose_name=_('Age Limit'))
    # type = models.CharField(choices=MOVIE_CHOICES, max_length=10, verbose_name=_('Type'))
    category = models.ForeignKey(Category, default='', on_delete=models.CASCADE, verbose_name=_('Category'))
    image = models.ImageField(upload_to='covers')
    video = models.ManyToManyField('Video')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('is_top', '-created_at',)
        verbose_name = _('Movie')
        verbose_name_plural = _('Movies')


class Video(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'), unique=True)
    file = models.FileField(upload_to='movies')
    # movie = models.ForeignKey(
    #     to=Movie,
    #     on_delete=models.CASCADE,
    # )
    def __str__(self):
        return self.title


class MovieImage(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    movie = models.ForeignKey(
        to=Movie,
        on_delete=models.CASCADE,
        related_name='movie_images',
        verbose_name=_('Movie')
    )
    image = models.ImageField(upload_to='movie-images/%Y/%m/%d/', verbose_name=_('Image'))

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = _('Movie Image')
        verbose_name_plural = _('Movie Images')
