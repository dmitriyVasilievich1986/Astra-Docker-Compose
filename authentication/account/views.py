from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializer import LoginSerializer, AccountSerializer
from knox.models import AuthToken
from rest_framework import permissions, response, serializers


class LoginViewSet(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = AuthToken.objects.create(user)
        context = {
            "user": AccountSerializer(user).data,
            "token": token[1],
        }
        return response.Response(context)


class RegisterViewSet(GenericAPIView):
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)
        context = {
            "user": serializer.data,
            "token": token[1],
        }
        return response.Response(context)


class AccountViewSet(GenericAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance != request.user and not request.user.is_superuser:
            raise serializers.ValidationError("У вас нет прав на это действие")

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return response.Response(serializer.data)

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return response.Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return response.Response({"user": self.get_serializer(request.user).data})
