from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializer import CommentsSerializer
from api.support_class import ReadOnlyOrAdmin
from .models import Comments
from rest_framework import serializers
from rest_framework.decorators import action


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comments.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.user = request.user
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, headers=headers)

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            raise serializers.ValidationError("not the same user")
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)