from django.urls import path
from .views import *

urlpatterns = [
    path("signup", Signup.as_view(), name="signup"),
    path("login", Login.as_view(), name="login"),
    # path('logout', LogoutView.as_view(), name='logout'),
    # path('accounts', LogoutView.as_view(), name='logout'),
]
