from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AuthorSerializer
from .models import Author

# Create your views here.

class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()