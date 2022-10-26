from rest_framework import serializers
from .models import Category, Post, Like

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('type', 'title', 'id', 'source', 'origin', 'description', 
    'contentType', 'content', 'author', 'categories', 'comments', 'count', 'published',
    'visibility', 'unlisted')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["categories"] = [cat['name'] for cat in CategorySerializer(instance.categories.all(), many=True).data]
        rep["count"] = Like.objects.filter(post_id = instance.id).count()
        return rep

