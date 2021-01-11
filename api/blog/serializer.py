from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            "id",
            "name",
            "title",
            "HTMLText",
            "created_at",
            "updated_at",
            "get_likes_count",
        )
        read_only_fields = (
            "id",
            "created_at",
            "get_likes_count",
        )

    def update(self, instance, validated_data, *args, **kwargs):
        instance.name = validated_data.get("name", instance.name)
        instance.title = validated_data.get("title", instance.title)
        instance.catalog = validated_data.get("catalog", instance.catalog)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.save()
        return instance