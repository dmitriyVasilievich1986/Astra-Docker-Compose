from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializer import LoginSerializer, AccountSerializer
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework import permissions


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
        return Response(context)


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
        return Response(context)


class AccountViewSet(GenericAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({"user": self.get_serializer(request.user).data})

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response({"user": serializer.data})
