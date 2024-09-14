from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import User


# Signup View (what happens when the user tries to sign up)
class Signup(APIView):

    # Give this view a "free pass" so we don't have to be authenticated to sign up or login
    permission_classes = [AllowAny]

    def post(self, request):

        # Serializes the data
        serializer = UserSerializer(data=request.data)

        # Creates an authenticator (bearer token) this allows the user to stay logged in for subsequent calls
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
            return Response(data, status=status.HTTP_200_OK)


# class Logout(APIView):


# class Accounts(APIView):
