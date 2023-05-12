from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('movies.urls.v1')),
    path('', include('users.urls.v1')),
    # path('', include('notifications.urls.v1'))
]