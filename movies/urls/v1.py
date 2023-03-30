from rest_framework.routers import DefaultRouter

from .. import views

router = DefaultRouter()
router.register(r'movie-images', views.MovieImageViewSet)
router.register(r'movies', views.MovieViewSet)
router.register(r'videos', views.VideoViewSet)

urlpatterns = router.urls
