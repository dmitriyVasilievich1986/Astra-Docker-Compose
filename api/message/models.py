from django.db import models
from django.conf import settings


class Message(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    HTMLText = models.TextField(blank=True, null=True)
    sender = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sended_messages",
    )
    receiver = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL,
        related_name="received_messages",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_received = models.BooleanField(default=False)

    def update(self, instance, validated_data, *args, **kwargs):
        instance.text = validated_data.get("text", instance.text)
        instance.title = validated_data.get("title", instance.title)
        instance.receiver = validated_data.get("receiver", instance.receiver)
        instance.HTMLText = validated_data.get("HTMLText", instance.HTMLText)
        instance.sender = instance.sender
        instance.save()
        return instance

    @property
    def get_unreaded_messages_count(self):
        user = self.receiver
        return len(user.received_messages.all())