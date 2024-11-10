from django.urls import path
from .views import *

urlpatterns = [
    path("signup", Signup.as_view(), name="signup"),
    path("login", Login.as_view(), name="login"),
    path('logout', Logout.as_view(), name='logout'),
    path('validate-token', ValidateToken.as_view(), name='validate_token'),
    path('refresh-token', RefreshAccessToken.as_view(), name='refresh_token'),
    # path('accounts', LogoutView.as_view(), name='logout'),
]
