from django.urls import path
from .views import LoginViewSet, RegisterViewSet, AccountViewSet
from knox.views import LogoutView


urlpatterns = [
    path("login/", LoginViewSet.as_view()),
    path("register/", RegisterViewSet.as_view()),
    path("account/", AccountViewSet.as_view()),
    path("logout/", LogoutView.as_view()),
]
