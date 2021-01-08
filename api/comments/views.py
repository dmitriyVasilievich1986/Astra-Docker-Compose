from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializer import CommentsSerializer
from api.support_class import ReadOnlyOrAdmin
from .models import Comments
from rest_framework import serializers
from rest_framework.decorators import action
from blog.models import Blog


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comments.objects.all()

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            raise serializers.ValidationError("not the same user")
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)