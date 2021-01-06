from django.urls import path
from rest_framework import routers

from blog.views import BlogViewSet
from catalog.views import CatalogViewSet
from comments.views import CommentsViewSet
from full_catalog.views import FullCatalogViewSet

router = routers.DefaultRouter()

router.register("blog", BlogViewSet)
router.register("catalog", CatalogViewSet)
router.register("comments", CommentsViewSet)
router.register("fullcatalog", FullCatalogViewSet)

urlpatterns = router.urls