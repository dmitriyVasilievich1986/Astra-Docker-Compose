from django.conf import settings
from django.db import models
from catalog.models import Catalog


class Blog(models.Model):
    name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    HTMLText = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL)
    catalog = models.ForeignKey(
        to=Catalog,
        related_name="blog",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    @property
    def get_likes_count(self):
        return self.likes.all().count()

    @property
    def get_parent(self):
        output = [
            {
                "name": self.name,
                "title": self.title,
            }
        ] + self.catalog.get_parent
        return output

    @property
    def get_comments(self):
        output = list()
        for comment in self.comments.all():
            output.append(comment.get_child)
        return output