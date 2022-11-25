from rest_framework import serializers
from .models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('sender', 'recipient', 'network')