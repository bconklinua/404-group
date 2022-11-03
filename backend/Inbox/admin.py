from django.contrib import admin
from .models import Inbox

class PostAdmin(admin.ModelAdmin):
    list_display = '__all__'

admin.site.register(Inbox)