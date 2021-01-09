from django.db import models
from blog.models import Blog


class Catalog(models.Model):
    name = models.CharField(max_length=150, unique=True)
    title = models.CharField(max_length=150, blank=True, null=True)
    parent = models.ForeignKey(
        to="self",
        on_delete=models.CASCADE,
        related_name="child",
        blank=True,
        null=True,
    )
    blog = models.OneToOneField(
        to=Blog,
        on_delete=models.CASCADE,
        related_name="catalog",
        blank=True,
        null=True,
    )

    @property
    def get_child(self):
        if self.child.all().count() == 0:
            blog_data = {
                "name": self.blog.name if self.blog else "",
                "title": self.blog.title if self.blog else "",
            }
            return {"name": self.name, "title": self.title, "blog": blog_data}
        output = {"name": self.name, "title": self.title, "child": list()}
        for child in self.child.all():
            output["child"].append(child.get_child)
        return output

    @property
    def get_parent(self):
        if self.parent is None:
            return {"name": self.name, "title": self.title}
        output = {
            "name": self.name,
            "title": self.title,
            "parent": self.parent.get_parent,
        }
        return output
