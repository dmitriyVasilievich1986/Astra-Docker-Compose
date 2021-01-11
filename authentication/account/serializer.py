from .models import Account
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
from message.models import Message


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data, *args, **kwargs):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorect credentials.")


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            "get_message_count",
            "first_name",
            "last_name",
            "username",
            "password",
            "email",
        )
        extra_kwargs = {"password": {"write_only": True}}
        read_only_fields = ("get_message_count",)

    def create(self, validated_data, *args, **kwargs):
        message = Message(
            HTMLText="Приветствуем вас на нашем сайте.",
            title="Приветствие",
            sender=Account.objects.first(),
        )
        message.save()
        user = Account.objects.create_user(**validated_data)
        user.received_messages.add(message)
        user.save()
        return user

    def update(self, instance, validated_data, *args, **kwargs):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()
        return instance
