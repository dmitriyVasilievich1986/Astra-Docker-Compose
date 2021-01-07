from rest_framework import viewsets, permissions
from .serializer import MessageSerializer
from .models import Message
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(Q(sender=user) | Q(receiver=user))

    @action(detail=False, methods=["GET"])
    def get_received(self, request, *args, **kwargs):
        user = request.user
        queryset = user.received_messages.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)