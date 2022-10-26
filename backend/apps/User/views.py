from django.shortcuts import render
from rest_framework import viewsets, response, status, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .serializers import AuthorSerializer
from .models import Author
from django.contrib.auth import authenticate, login


class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class RegisterAPIView(GenericAPIView):
    authentication_classes = []  # Prevent requiring a valid token to login
    permission_classes = (permissions.AllowAny,)
    serializer_class = AuthorSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = []  # Prevent requiring a valid token to login
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = serializers.LoginSerializer(data=self.request.data,
                                                 context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


class TestIfLoggedIn(APIView):
    #authentication_classes = []  # Prevent requiring a valid token to login
    # This view should be accessible also for unauthenticated users.
    #permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            print("authenticated")
            return Response("authenticated", status=status.HTTP_202_ACCEPTED)
        else:
            print("not authenticated")
            return Response("not authenticated", status=status.HTTP_401_UNAUTHORIZED)
