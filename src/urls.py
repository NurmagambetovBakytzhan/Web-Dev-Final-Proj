from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
# from movies.views import VideoPlayer
from src import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('src.api_urls')),
    path('__debug__/', include('debug_toolbar.urls')),
    # path('video/<uuid:video_id>/', VideoPlayer, name='video_player'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)