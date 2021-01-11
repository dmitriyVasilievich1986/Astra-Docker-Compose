from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "title",
            "sender",
            "receiver",
            "HTMLText",
            "created_at",
            "is_received",
            "get_sender_name",
            "get_unreaded_messages_count",
        ]
        read_only_fields = (
            "id",
            "get_sender_name",
            "created_at",
            "get_unreaded_messages_count",
        )
        extra_kwargs = {
            "sender": {"write_only": True},
            "receiver": {"write_only": True},
        }

    def update(self, instance, validated_data, *args, **kwargs):
        instance.is_received = validated_data.get("is_received", instance.is_received)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.title = validated_data.get("title", instance.title)
        instance.save()
        return instance