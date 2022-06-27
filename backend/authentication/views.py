from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from authentication.models import User
from authentication.serializers import UserSerializer

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        User.objects.create_user(
            **serializer.validated_data, email_list=request.data['email_list'])
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
