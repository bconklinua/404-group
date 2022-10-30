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
from apps.Like.views import PostLikeView, AuthorLikeView
from rest_framework import routers
from apps.Post.views import PostView
from apps.User.views import AuthorView
from apps.FriendRequest.views import FRSendView, FRListView, FRAcceptView, FRRejectView
from apps.Follow.views import FollowersListView, FollowingListView, TrueFriendsListView

post_router = routers.DefaultRouter()
post_router.register(r'posts', PostView, 'posts')
author_router = routers.DefaultRouter()
author_router.register(r'authors', AuthorView, 'authors')
post_like_router = routers.DefaultRouter()
post_like_router.register(r'likes', PostLikeView, 'likes')
author_like_router = routers.DefaultRouter()
author_like_router.register(r'likes', AuthorLikeView, 'likes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(author_router.urls)),
    path('', include(post_router.urls)),
    path('api/', include('apps.User.urls')),
    path('api/auth/', include("apps.User.urls")),
    path('friendrequest/', FRListView.as_view()),
    path('friendrequest/accept/<int:fr_id>/', FRAcceptView.as_view()),
    path('friendrequest/reject/<int:fr_id>/', FRRejectView.as_view()),
    path('friendrequest/<int:author_id>/', FRSendView.as_view()),
    path('authors/<int:author_id>/', include(post_router.urls)),
    path('authors/<int:author_id>/', include(author_like_router.urls)),
    path('posts/<int:post_id>/', include(post_like_router.urls)),
    path('comments/<int:comment_id>/', include(post_like_router.urls)),
    path('authors/<int:author_id>/inbox/', include('apps.Inbox.urls')),
    path('followers/', FollowersListView.as_view()),
    path('following/', FollowingListView.as_view()),
    path('truefriends/', TrueFriendsListView.as_view()),

]
