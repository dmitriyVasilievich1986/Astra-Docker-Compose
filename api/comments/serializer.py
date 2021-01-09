from rest_framework import serializers
from .models import Comments


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "text", "get_username"
        read_only_fields = "get_username"

    def update(self, instance, validated_data, *args, **kwargs):
        instance.text = validated_data.get("text", instance.text)
        instance.save()
        return instance