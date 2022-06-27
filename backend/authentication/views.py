from authentication.models import User, Email
from authentication.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.authtoken.models import Token


@api_view(['POST'])
def login(request):

    if request.content_type == 'application/json':
        data = request.data
        print(data)
        return Response({ "message": 'hola mundo!' })
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signup(request):
    # if request.content_type == 'application/json':
    #     data = request.data

    #     u = User(username="holo5", password="12345")
    #     u.save()
    #     e = Email(email="j3@g.c", user=u)
    #     e.save()

    #     s = UserSerializer(u)
    # JSONParser().parse(request)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
