from venv import create
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from User.models import Author
from rest_framework import viewsets, status, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from Follow.models import Follow
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    def get_queryset(self):
        user_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        if user_id:
            return Post.objects.filter(author=user_id).filter()
        return Post.objects.all()
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        author_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        author_username = self.kwargs['author_username'] if 'author_username' in self.kwargs else None
        if author_id and author_username:
            try:
                post_author = Author.objects.filter(username=author_username).get(id=author_id)
            except ObjectDoesNotExist:
                post_author = Author.objects.create(id=author_id, username=author_username, email=author_username + "@gmail.com", password="password123")
        else:
            post_author = request.user
        if serializer.is_valid():
            serializer.save(author=post_author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PostSerializer(instance=instance)
        serializer.data['count'] = instance.count
        return Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        if user_id == request.user.id or not user_id:
            serializer = PostSerializer(queryset, many=True)
            return Response(serializer.data)

        author_follows = Follow.objects.filter(followee_id=user_id).filter(follower=request.user)
        user_follows = Follow.objects.filter(followee=request.user).filter(follower_id=user_id)
        #If they are not friends, show only public posrs 
        if not author_follows or not user_follows:
            queryset = queryset.filter(visibility="PUBLIC")
        queryset = queryset.filter(unlisted=False)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author == request.user:
            return super().update(request)
        return Response("not authenticated", status=status.HTTP_401_UNAUTHORIZED)
        

class LoggedInPostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def list(self, request):
        queryset = Post.objects.filter(author = request.user)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)