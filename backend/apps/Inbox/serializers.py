from ..Comment.models import Comment
from rest_framework import serializers
from ..Post.serializers import PostSerializer 
from ..Like.serializers import LikeSerializer 
from .models import Inbox
from ..Like.models import Like
from ..Post.models import Post
from ..Comment.serializers import CommentSerializer


class InboxSerializer(serializers.ModelSerializer):

    items = serializers.SerializerMethodField()

    class Meta:
        model = Inbox
        fields = ('type','items')

    def get_items(self, obj):
        items = [post for post in PostSerializer(obj.posts.all(), many=True).data]
        authors_posts = Post.objects.filter(author=obj.author)
        
        #add likes on author's posts
        for like in LikeSerializer(Like.objects.filter(post__in=authors_posts), many=True).data:
            items.append(like)

        #add likes on author's posts
        for comment in CommentSerializer(Comment.objects.filter(post__in=authors_posts), many=True).data:
            items.append(comment)

        return items

