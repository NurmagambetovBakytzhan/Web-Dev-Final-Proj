import json

from channels.generic.websocket import AsyncWebsocketConsumer


class MovieNotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        await self.channel_layer.group_add(
            "movie_notification",
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            "movie_notification",
            self.channel_name,
        )

    async def send_notification(self, event: dict):
        await self.send(text_data=json.dumps(event))