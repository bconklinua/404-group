from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LikeSerializer
from .models import Like
from rest_framework.response import Response
from rest_framework import viewsets, status


class PostLikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer

    def get_queryset(self):
        liked_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        liked_comment_id = self.kwargs['comment_id'] if 'comment_id' in self.kwargs else None
        if liked_comment_id:
            return Like.objects.filter(comment_id=liked_comment_id)
        if liked_post_id:
            return Like.objects.filter(post_id=liked_post_id)
        return Like.objects.all()


    def create(self, request, *args, **kwargs):
        liked_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(post_id=liked_post_id)
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = LikeSerializer(instance=instance)
        serializer.data['summary'] = instance.summary
        return Response(serializer.data)

class AuthorLikeView(viewsets.ModelViewSet):

    serializer_class = LikeSerializer

    def get_queryset(self):
        user_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        if user_id:
            return Like.objects.filter(author_id=user_id)
        return Like.objects.all()