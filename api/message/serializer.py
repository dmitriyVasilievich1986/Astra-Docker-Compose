from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField("get_sender_name")

    class Meta:
        model = Message
        fields = [
            "id",
            "title",
            "text",
            "HTMLText",
            "sender_name",
            "is_received",
            "created_at",
        ]

    def get_sender_name(self, obj, *args, **kwargs):
        return obj.sender.username
