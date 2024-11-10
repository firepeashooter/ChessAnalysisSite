from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer): #Converts python data structures so it can be easily converted to JSON
    class Meta:
        model = User
        fields = ["email", "password", "username"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
