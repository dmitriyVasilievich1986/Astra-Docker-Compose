from catalog.models import Catalog
from django.conf import settings
from django.db import models


class Blog(models.Model):
    name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    HTMLText = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL)

    @property
    def get_likes_count(self):
        return self.likes.all().count()

    @property
    def get_parent(self):
        return {
            "name": self.name,
            "title": self.title,
            "parent": self.catalog.get_parent,
        }

    @property
    def get_comments(self):
        output = list()
        for comment in self.comments.all():
            output.append(comment.get_child)
        return output