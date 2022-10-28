from django.shortcuts import render
from rest_framework import viewsets, response, status, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from . import serializers
from .serializers import AuthorSerializer
from .models import Author
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.authentication import JWTAuthentication

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
            password = serializer.validated_data.get('password')
            serializer.validated_data['password'] = make_password(password)
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
        return Response({'id': user.id,
                        'email': user.email,
                         'username': user.username,
                         'first_name': user.first_name,
                         'last_name': user.last_name,
                         'is_staff': user.is_staff,
                         'is_superuser': user.is_superuser,
                         'date_joined': user.date_joined,
                         }, status=status.HTTP_202_ACCEPTED)


class TestIfLoggedIn(APIView):
    # authentication_classes = []  # Prevent requiring a valid token to login
    # This view should be accessible also for unauthenticated users.
    # permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            print("authenticated")
            person = request.user
            print("username: " + person.username)
            print("email:" + person.email)

            return Response("authenticated", status=status.HTTP_202_ACCEPTED)
        else:
            print("not authenticated")
            return Response("not authenticated", status=status.HTTP_401_UNAUTHORIZED)
