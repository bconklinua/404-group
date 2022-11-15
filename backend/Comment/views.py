from django.shortcuts import render
from .serializers import CommentSerializer
from .models import Comment
from Post.models import Post
from Follow.models import Follow
from rest_framework.response import Response
from rest_framework import viewsets, status

class PostCommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        comment_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        if comment_post_id:
            return Comment.objects.filter(post_id=comment_post_id)
        return Comment.objects.all()

    def create(self, request, *args, **kwargs):
        liked_post_id = self.kwargs['post_id'] if 'post_id' in self.kwargs else None
        post_obj = Post.objects.get(id=liked_post_id)
        if post_obj.visibility == 'FRIENDS':
            commenter = request.user
            post_owner = post_obj.author
            follow_obj = Follow.objects.filter(follower=commenter, followee=post_owner)
            if not post_owner == commenter:
                if not follow_obj.exists():
                    return Response({"error": "must be a follower to comment on a private post"},
                                    status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(post_id=liked_post_id)
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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