from django.contrib import admin
from .models import Category, Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'description', 
    'contentType', 'content', 'author', 'get_categories', 'published',
    'visibility', 'unlisted', 'image')

admin.site.register(Post, PostAdmin)
admin.site.register(Category)