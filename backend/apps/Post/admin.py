from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('type', 'title', 'id', 'source', 'origin', 'description', 
    'contentType', 'content', 'author', 'categories', 'count', 'comments', 'published',
    'visibility', 'unlisted')

admin.site.register(Post, PostAdmin)