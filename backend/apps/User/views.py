from django.shortcuts import render
from rest_framework import viewsets, response, status
from rest_framework.generics import GenericAPIView
from .serializers import AuthorSerializer
from .models import Author

# Create your views here.


class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class RegisterAPIView(GenericAPIView):
    authentication_classes = []  # Prevent requiring a valid token to login
    serializer_class = AuthorSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
