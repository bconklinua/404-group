from venv import create
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from apps.User.models import Author
from rest_framework import viewsets, status, permissions

# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    def get_queryset(self):
        user_id = self.kwargs['author_id']
        if user_id:
            return Post.objects.filter(author_id=user_id)
        return super().get_queryset()
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PostSerializer(instance=instance)
        serializer.data['count'] = instance.count
        return Response(serializer.data)