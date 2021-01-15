from django.db import models


class Catalog(models.Model):
    name = models.CharField(max_length=150, unique=True, blank=True)
    title = models.CharField(max_length=150, blank=True, null=True)
    parent = models.ForeignKey(
        to="self",
        on_delete=models.CASCADE,
        related_name="child",
        blank=True,
        null=True,
    )

    @property
    def get_child(self):
        if self.child.all().count() == 0:
            blogs_data = list()
            for x in self.blog.all():
                blogs_data.append({"name": x.name, "title": x.title})
            return {"name": self.name, "title": self.title, "blog": blogs_data}
        output = {"name": self.name, "title": self.title, "child": list()}
        for child in self.child.all():
            output["child"].append(child.get_child)
        return output

    @property
    def get_parent(self):
        if self.parent is None:
            return {"name": self.name, "title": self.title}
        output = [
            {
                "name": self.name,
                "title": self.title,
            }
        ] + self.parent.get_parent
        return output
