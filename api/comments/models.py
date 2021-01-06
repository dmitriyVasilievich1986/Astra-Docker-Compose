from django.db import models
from blog.models import Blog
from django.conf import settings


class Comments(models.Model):
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="blog_comment",
    )
    owner = models.ForeignKey(
        to=Blog,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="comments",
    )
    parent = models.ForeignKey(
        to="self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="answers",
    )
    text = models.TextField()
