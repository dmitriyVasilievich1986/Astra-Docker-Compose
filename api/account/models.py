from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    email = models.EmailField(blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password"]

    def create_user(self, email, password, *args, **kwargs):
        email = self.normalize_email(email)
        self.__init__(email=email, **kwargs)
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