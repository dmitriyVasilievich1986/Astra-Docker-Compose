from rest_framework import (
    viewsets,
    permissions,
    response,
    status,
    serializers,
    decorators,
)
from .serializer import CommentsSerializer
from api.support_class import ReadOnlyOrAdmin
from .models import Comments


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comments.objects.all()

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user and not request.user.is_superuser:
            raise serializers.ValidationError("У вас нет прав на это действие")

        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user and not request.user.is_superuser:
            raise serializers.ValidationError("У вас нет прав на это действие")

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}
        return response.Response(serializer.data)