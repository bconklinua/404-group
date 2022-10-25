from django.contrib import admin
from .models import Category, Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('type', 'title', 'id', 'source', 'origin', 'description', 
    'contentType', 'content', 'author', 'get_categories', 'count', 'comments', 'published',
    'visibility', 'unlisted')

admin.site.register(Post, PostAdmin)
admin.site.register(Category)