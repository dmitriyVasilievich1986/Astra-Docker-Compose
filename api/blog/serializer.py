from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            "name",
            "title",
            "HTMLText",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("get_likes_count",)

    def update(self, instance, validated_data, *args, **kwargs):
        instance.name = validated_data.get("name", instance.name)
        instance.title = validated_data.get("title", instance.title)
        instance.catalog = validated_data.get("catalog", instance.catalog)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.save()
        return instance