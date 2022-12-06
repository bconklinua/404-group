from Comment.models import Comment
from rest_framework import serializers
from Post.serializers import PostSerializer
from Like.serializers import LikeSerializer
from .models import Inbox
from Like.models import Like
from Post.models import Post
from Comment.serializers import CommentSerializer


class InboxSerializer(serializers.ModelSerializer):

    posts = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Inbox
        fields = ('type','author','posts', 'likes','comments')

    def get_posts(self, obj):
        return [post for post in PostSerializer(obj.posts.all().order_by('published'), many=True).data]
    
    def get_likes(self, obj):
        #Get posts made by the author
        authors_posts = Post.objects.filter(author=obj.author)

        #get comments made by the author
        authors_comments = Comment.objects.filter(author=obj.author)
        
        #add likes on author's posts
        likes = []
        post_likes = Like.objects.filter(post__in=authors_posts).filter(comment__isnull=True)
        comment_likes = Like.objects.filter(comment__in=authors_comments)
        like_queryset = post_likes | comment_likes
        for like in LikeSerializer(like_queryset.order_by('date'), many=True).data:
            likes.append(like)

        return likes

    def get_comments(self, obj):
        #Get posts made by the author
        authors_posts = Post.objects.filter(author=obj.author)
    
        #add comments on author's posts
        comments = []
        for comment in CommentSerializer(Comment.objects.filter(post__in=authors_posts).order_by('published'), many=True).data:
            comments.append(comment)

        return comments

