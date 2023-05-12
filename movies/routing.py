from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/movies/', consumers.MovieNotificationConsumer.as_asgi()),
]

channel_routing = {
    "group": "movie_notifications",
    "channel": {
        "type": "websocket",
        "path": "/ws/movies/",
        "name": "movie_notifications"
    }
}
