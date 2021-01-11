from rest_framework import serializers
from .models import Comments


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "text", "get_username", "user", "owner", "parent"
        read_only_fields = ("get_username",)
        extra_kwargs = {
            "user": {"write_only": True},
            "owner": {"write_only": True},
            "parent": {"write_only": True},
        }

    def update(self, instance, validated_data, *args, **kwargs):
        instance.text = validated_data.get("text", instance.text)
        instance.save()
        return instance