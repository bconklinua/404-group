from rest_framework import serializers
from .models import Category, Post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class PostSerializer(serializers.ModelSerializer):
    # categories = serializers.StringRelatedField(many=True)
    class Meta:
        model = Post
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["categories"] = [cat['name'] for cat in CategorySerializer(instance.categories.all(), many=True).data]
        return rep

