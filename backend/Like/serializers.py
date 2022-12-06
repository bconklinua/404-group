from Post.serializers import PostSerializer
from Comment.serializers import CommentSerializer
from rest_framework import serializers
from .models import Like
from User.serializers import AuthorSerializer

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'type','summary', 'author', 'post', 'comment')


    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["post"] = PostSerializer(instance.post).data
        rep["author"] = AuthorSerializer(instance.author).data
        return rep