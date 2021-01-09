from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "text",
            "title",
            "HTMLText",
            "created_at",
            "is_received",
            "get_sender_name",
        ]
        read_only_fields = "get_sender_name", "is_received", "created_at"

    def update(self, instance, validated_data, *args, **kwargs):
        instance.receiver = validated_data.get("receiver", instance.receiver)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.title = validated_data.get("title", instance.title)
        instance.text = validated_data.get("text", instance.text)
        instance.save()
        return instance