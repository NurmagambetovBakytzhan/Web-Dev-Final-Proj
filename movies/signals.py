from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from . import models


@receiver(post_save, sender=models.Movie)
def send_movie_notification(sender, instance, created, **kwargs):

    channel_layer = get_channel_layer()
    message = f"New movie {instance.title} created"
    async_to_sync(channel_layer.group_send)(
        "movie_notifications",
        {
            "type": "movie.created",
            "message": message
        }
    )
