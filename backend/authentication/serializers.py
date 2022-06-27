from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    email_list = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'created', 'email_list']
