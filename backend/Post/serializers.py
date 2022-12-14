from typing import OrderedDict
from rest_framework import serializers
from .models import Category, Post, Like
from User.serializers import AuthorSerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class PostSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = ('type','author', 'title', 'id', 'source', 'origin', 'description', 
    'contentType', 'content', 'categories', 'count', 'published',
    'visibility', 'unlisted', 'image', 'image_url','host', 'original_author','original_author_id', 'original_author_host')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if not isinstance(instance, OrderedDict):
            rep["author"] = AuthorSerializer(instance.author).data
            rep["categories"] = [cat['name'] for cat in CategorySerializer(instance.categories.all(), many=True).data]
        return rep

