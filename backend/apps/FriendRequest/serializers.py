from rest_framework import serializers
from .models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('sender', 'recipient')

    def to_representation(self, instance):
        print("friend request to_representation was called")
        rep = super().to_representation(instance)
        return rep