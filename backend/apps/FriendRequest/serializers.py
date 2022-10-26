from rest_framework import serializers
from .models import FriendRequest

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'