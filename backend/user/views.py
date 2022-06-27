from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.serializers import UserSerializer


class UserAPIView(APIView):
    """Current User view"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request):
        """ get current user"""
        user_ser = self.serializer_class(request.user)
        return Response(user_ser.data)

    def put(self, request):
        """update user"""
        user_ser = self.serializer_class(request.user, data=request.data, partial=True)
        if user_ser.is_valid():
            user_ser.save()
            return Response(user_ser.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)
