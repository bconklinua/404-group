from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CommentSerializer
from .models import Comment

# Create your views here.
class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()