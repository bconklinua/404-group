from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post
from apps.User.models import Author

# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['author_id']
        return Post.objects.filter(author_id=user_id)