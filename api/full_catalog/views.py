from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from api.support_class import ReadOnlyOrAdmin
from .serializer import FullCatalogSerializer
from .models import FullCatalog


class FullCatalogViewSet(viewsets.ModelViewSet):
    serializer_class = FullCatalogSerializer
    queryset = FullCatalog.objects.all()
    permission_classes = [ReadOnlyOrAdmin]

    @action(detail=False, methods=["GET"])
    def names_only(self, request, *args, **kwargs):
        queryset = FullCatalog.objects.all()
        return Response([{"name": x.name, "title": x.title} for x in queryset])
