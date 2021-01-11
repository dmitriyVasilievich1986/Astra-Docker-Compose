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
        related_name="child",
    )
    text = models.TextField(blank=True, null=True)

    @property
    def get_blog(self):
        if self.owner is not None:
            return self.owner
        return self.parent.get_blog

    @property
    def get_username(self):
        return self.user.username

    @property
    def get_child(self):
        if self.child.all().count() == 0:
            return {"id": self.id, "user": self.user.username, "text": self.text}
        output = {
            "id": self.id,
            "user": self.user.username,
            "text": self.text,
            "child": list(),
        }
        for child in self.child.all():
            output["child"].append(child.get_child)
        return output