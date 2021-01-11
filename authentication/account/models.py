from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    email = models.EmailField(blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password"]

    def create_user(self, password, email="", *args, **kwargs):
        from message.models import Message

        message = Message(
            HTMLText="hello", title="hello", sender=self.__class__.objects.first()
        )
        message.save()
        self.__init__(email=email, **kwargs)
        self.received_messages.add(message.id)
        self.set_password(password)
        self.save()

        return self

    def create_superuser(self, email, password, *args, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)

        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)

    @property
    def get_message_count(self):
        return self.received_messages.filter(is_received=False).count()