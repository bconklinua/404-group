from typing import OrderedDict
from rest_framework import serializers
from .models import Category, Post, Like

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('type','author', 'title', 'id', 'source', 'origin', 'description', 
    'contentType', 'content', 'categories', 'count', 'published',
    'visibility', 'unlisted', 'image')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if not isinstance(instance, OrderedDict):
            rep["categories"] = [cat['name'] for cat in CategorySerializer(instance.categories.all(), many=True).data]
        return rep

