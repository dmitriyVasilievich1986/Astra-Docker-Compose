from django.shortcuts import get_object_or_404

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from api.support_class import ReadOnlyOrAdmin
from full_catalog.models import FullCatalog
from .serializer import CatalogSerializer
from .models import Catalog


class CatalogViewSet(viewsets.ModelViewSet):
    serializer_class = CatalogSerializer
    queryset = Catalog.objects.all()
    permission_classes = [ReadOnlyOrAdmin]

    @action(detail=True, methods=["GET"])
    def catalog_by_id(self, request, pk=None, *args, **kwargs):
        full_catalog = get_object_or_404(FullCatalog, name=pk)
        queryset = Catalog.objects.filter(full_catalog=full_catalog)
        names_list = {
            "catalog": [{"name": x.name, "title": x.title} for x in queryset],
            "full_catalog_name": queryset[0].full_catalog.title,
        }
        return Response(names_list)

    @action(detail=False, methods=["GET"])
    def names_only(self, request, *args, **kwargs):
        queryset = Catalog.objects.values_list("name", flat=True)
        return Response(queryset)
