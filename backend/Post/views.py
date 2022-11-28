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

def has_remote_followers(team_host, author):

    followers =  Follow.objects.filter(followee=author)
    for follow in followers:
        if (follow.follower.host == team_host):
            return True
    return False

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
        response_dict = {}
        if author_id and author_username:
            try:
                post_author = Author.objects.filter(username=author_username).get(id=author_id)
            except ObjectDoesNotExist:
                post_author = Author.objects.create(id=author_id, username=author_username, email=author_username + "@gmail.com", password="password123", host=request.user.host)
            
        else:
            post_author = request.user
            if post_author.host == "https://true-friends-404.herokuapp.com": 
                response_dict = {
                    "team13_followers": has_remote_followers("https://cmput404-team13.herokuapp.com", post_author),
                    "team19_followers": has_remote_followers("https://social-distribution-404.herokuapp.com", post_author)
                }
        if serializer.is_valid():
            serializer.save(author=post_author)
            serializer.save(host=post_author.host)
            response_dict.update(serializer.data)
            return Response(response_dict, status=status.HTTP_201_CREATED)
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
    
    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }  
        

class LoggedInPostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def list(self, request):
        queryset = Post.objects.filter(author = request.user)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)