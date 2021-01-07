from .models import Account
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data, *args, **kwargs):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorect credentials.")


class AccountSerializer(serializers.ModelSerializer):
    message_count = serializers.SerializerMethodField("get_message_count")

    class Meta:
        model = Account
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "message_count",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def get_message_count(self, obj, *args, **kwargs):
        return obj.received_messages.filter(is_received=False).count()

    def create(self, validated_data, *args, **kwargs):
        user = Account.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data, *args, **kwargs):
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()
        return instance
