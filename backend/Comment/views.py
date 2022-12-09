from django.shortcuts import render
from .serializers import CommentSerializer
from .models import Comment
from Post.models import Post
from Follow.models import Follow
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
from User.models import Author
from django.core.exceptions import ObjectDoesNotExist
import os

def has_remote_followers(team_host, author):
    followers =  Follow.objects.filter(followee=author)
    for follow in followers:
        if (follow.follower.host == team_host):
            return True
    return False

class PostCommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        comment_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        if comment_post_id:
            return Comment.objects.filter(post_id=comment_post_id)
        return Comment.objects.all()

    def create(self, request, *args, **kwargs):
        liked_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        author_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        author_username = self.kwargs['author_username'] if 'author_username' in self.kwargs else None
        response_dict = {}
        try:
            post_obj = Post.objects.get(id=liked_post_id)
            post_author = post_obj.author
            if post_author.host == "https://true-friends-404.herokuapp.com": 
                response_dict = {
                    "team13_followers": has_remote_followers("https://cmput404-team13.herokuapp.com", post_author),
                    "team19_followers": has_remote_followers("https://social-distribution-404.herokuapp.com", post_author),
                    "team_10_followers": has_remote_followers("https://socioecon.herokuapp.com", post_author)
                }
        except:
            return Response("Cannot comment on post since no post with id " + str(liked_post_id) + " exists", status=status.HTTP_202_ACCEPTED)
        if author_id and author_username:
            try:
                comment_author = Author.objects.filter(username=author_username).get(id=author_id)
            except ObjectDoesNotExist:
                comment_author = Author.objects.create(id=author_id, username=author_username, email=author_username + "@gmail.com", password="password123", host=request.user.host)
        else:
            comment_author = request.user
        if post_obj.visibility == 'FRIENDS':
            commenter = comment_author
            post_owner = post_obj.author
            follow_obj = Follow.objects.filter(follower=commenter, followee=post_owner)
            if not post_owner == commenter:
                if not follow_obj.exists():
                    return Response({"error": "must be a follower to comment on a private post"},
                                    status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(post_id=liked_post_id)
            serializer.save(author=comment_author)
            response_dict.update(serializer.data)
            return Response(response_dict, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CommentSerializer(instance=instance)
        serializer.data['count'] = instance.count
        return Response(serializer.data)

class AuthorCommentView(viewsets.ModelViewSet):

    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        if user_id:
            if user_id == self.request.user.id:
                return Comment.objects.filter(author_id=user_id)
            else:
                follow_obj = Follow.objects.filter(follower=self.request.user.id, followee=user_id)
                if follow_obj.exists():
                    return Comment.objects.filter(author_id=user_id)
                else:
                    return Comment.objects.filter(author_id=-1)
        return Comment.objects.filter(author_id=-1)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CommentSerializer(instance=instance)
        serializer.data['count'] = instance.count
        return Response(serializer.data)