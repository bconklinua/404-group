"""truefriends URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from apps.Like.views import LikeView
from rest_framework import routers
from apps.Post.views import PostView
from apps.User.views import AuthorView

post_router = routers.DefaultRouter()
post_router.register(r'posts', PostView, 'posts')
author_router = routers.DefaultRouter()
author_router.register(r'authors', AuthorView, 'authors')
like_router = routers.DefaultRouter()
like_router.register(r'likes', LikeView, 'likes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(author_router.urls)),
    path('api/', include('apps.User.urls')),
    path('api/auth/', include("apps.User.urls")),
    path('authors/<int:author_id>/', include(post_router.urls)),
    path('authors/<int:author_id>/posts/<int:post_id>/', include(like_router.urls)),
    path('authors/<int:author_id>/posts/<int:post_id>/comments/<int:comment_id>/', include(like_router.urls))
]
