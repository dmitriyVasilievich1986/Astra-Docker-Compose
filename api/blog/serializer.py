from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField("get_likes_count")
    catalog_name = serializers.SerializerMethodField("get_catalog_name")
    full_catalog_name = serializers.SerializerMethodField("get_full_catalog_name")

    class Meta:
        model = Blog
        fields = (
            "id",
            "name",
            "title",
            "catalog",
            "HTMLText",
            "created_at",
            "updated_at",
            "likes_count",
            "catalog_name",
            "full_catalog_name",
        )

    def get_likes_count(self, obj, *args, **kwargs):
        return obj.likes.count()

    def get_catalog_name(self, obj, *args, **kwargs):
        return obj.catalog.name

    def get_catalog_name(self, obj, *args, **kwargs):
        return obj.catalog.full_catalog.name

    def update(self, instance, validated_data, *args, **kwargs):
        instance.name = validated_data.get("name", instance.name)
        instance.title = validated_data.get("title", instance.title)
        instance.catalog = validated_data.get("catalog", instance.catalog)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.save()
        return instance