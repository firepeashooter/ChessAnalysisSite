from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
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
        user = User.objects.filter(username=username).first() #Check to see if the user is in the database

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
            return Response(data, status=status.HTTP_200_OK)

        return Response(data, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):

    #Token Validation
    permission_classes = [IsAuthenticated] 
    authentication_classes = [JWTAuthentication]

    
    def post(self, request):

        
        refresh_token = request.data["refresh"] #Pulls the access token out of the data 
        token = RefreshToken(refresh_token) #Makes it an actually token that we can blacklist
        token.blacklist()

        
        return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)


class ValidateToken(APIView):

    authentication_classes = [JWTAuthentication] #JWTAuthentication checks the validity of the token easy peasy basically because we can't access this class without a valid token
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "message": "Token is Valid",
            "user": {"username": user.username}
        },
        status=status.HTTP_200_OK
        )



class RefreshAccessToken(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        refresh_token = request.data.get("refresh")
        
        try:
            refresh = RefreshToken(refresh_token)

            new_access_token = refresh.access_token

            return Response({"access": str(new_access_token)},status=status.HTTP_200_OK)

        except TokenError:

            return Response({"detail": "Invalid refresh token or token has expired"}, status=status.HTTP_401_UNAUTHORIZED)



# class Accounts(APIView):
