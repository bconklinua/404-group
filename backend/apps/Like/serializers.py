from rest_framework import serializers
from .models import Like
from ..User.serializers import AuthorSerializer 

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'type','summary', 'author')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["author"] = AuthorSerializer(instance.author).data
        liked_object = "comment" if instance.comment else "post"
        rep["summary"] = "{} Likes your {}".format(str(instance.author), liked_object)
        return rep

