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
    class Meta:
        model = Account
        fields = "username", "email", "first_name", "last_name", "password"
        extra_kwargs = {"password": {"write_only": True}}

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
