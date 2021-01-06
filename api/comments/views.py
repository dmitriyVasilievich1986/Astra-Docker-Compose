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

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            raise serializers.ValidationError("no the same user")
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)