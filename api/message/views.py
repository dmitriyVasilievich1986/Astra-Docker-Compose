from rest_framework import viewsets, permissions, response, decorators
from .serializer import MessageSerializer
from .models import Message
from django.db.models import Q
from account.models import Account


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_superuser:
            return Message.objects.all()
        return Message.objects.filter(Q(sender=user) | Q(receiver=user))

    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return response.Response(serializer.data)

    @decorators.action(detail=False, methods=["GET"])
    def get_received(self, request, *args, **kwargs):
        queryset = request.user.received_messages.all()
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)