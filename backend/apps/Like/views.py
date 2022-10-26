from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LikeSerializer
from .models import Like

# Create your views here.

class LikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer

    def get_queryset(self):
        user_id = self.kwargs['author_id'] if 'author_id' in self.kwargs else None
        liked_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        liked_comment_id = self.kwargs['comment_id'] if 'comment_id' in self.kwargs else None
        if user_id:
            if liked_comment_id:
                return Like.objects.filter(author_id=user_id).filter(comment_id=liked_comment_id)
            if liked_post_id:
                return Like.objects.filter(author_id=user_id).filter(post_id=liked_post_id)
        return super().get_queryset()