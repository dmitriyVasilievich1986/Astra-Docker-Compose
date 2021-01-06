from catalog.models import Catalog
from django.conf import settings
from django.db import models


class Blog(models.Model):
    name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    HTMLText = models.TextField(blank=True, null=True)
    catalog = models.ForeignKey(
        Catalog, on_delete=models.CASCADE, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL)
