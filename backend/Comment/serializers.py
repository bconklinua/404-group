from rest_framework import serializers
from .models import Comment
from Post.serializers import PostSerializer
from User.serializers import AuthorSerializer


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','type','published','author','comment','post','contentType','count')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["post"] = PostSerializer(instance.post).data
        rep["author"] = AuthorSerializer(instance.author).data["username"]
        return rep