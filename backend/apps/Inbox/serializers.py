from rest_framework import serializers
from ..Post.serializers import PostSerializer 
from .models import Inbox

class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = ('type', 'author', 'posts')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["posts"] = [post for post in PostSerializer(instance.posts.all(), many=True).data]
        return rep

