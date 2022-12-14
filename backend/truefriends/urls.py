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
from django.urls import path, include, re_path
from Like.views import PostLikeView, AuthorLikeView, CommentLikeView
from drf_yasg import openapi
from rest_framework import routers, permissions
from Post.views import PostView, LoggedInPostView
from User.views import AuthorView
from FriendRequest.views import FRSendView, FRListView, FRAcceptView, FRRejectView, FRAcceptExternalView, FRSendFromExternalView, FRSendToExternalView, FRRejectExternalView
from Follow.views import FollowersListView, FollowingListView, TrueFriendsListView, UnfollowView, UnfriendView, WithdrawView
from Follow.views import FollowersListView, FollowingListView
from Comment.views import PostCommentView
from Comment.views import AuthorCommentView
from django.conf.urls.static import static
from django.conf import settings
#from rest_framework.schemas import get_schema_view
from drf_yasg.views import get_schema_view
from django.views.generic import TemplateView



post_router = routers.DefaultRouter()
post_router.register(r'posts', PostView, 'posts')
author_post_router = routers.DefaultRouter()
author_post_router.register(r'posts', PostView, 'author-posts')
logged_in_post_router = routers.DefaultRouter()
logged_in_post_router.register(r'posts', LoggedInPostView, 'my-posts')
author_router = routers.DefaultRouter()
author_router.register(r'authors', AuthorView, 'authors')
post_like_router = routers.DefaultRouter()
post_like_router.register(r'likes', PostLikeView, 'post-likes')
author_like_router = routers.DefaultRouter()
author_like_router.register(r'likes', AuthorLikeView, 'author-likes')
comment_like_router = routers.DefaultRouter()
comment_like_router.register(r'likes', CommentLikeView, 'comment-likes')
foreign_like_router = routers.DefaultRouter()
foreign_like_router.register(r'likes', PostLikeView, 'foreign-likes')
post_comment_router = routers.DefaultRouter()
post_comment_router.register(r'comments', PostCommentView, 'post-comments')
foreign_comment_router = routers.DefaultRouter()
foreign_comment_router.register(r'comments', PostCommentView, 'foreign-comments')
author_comment_router = routers.DefaultRouter()
author_comment_router.register(r'comments', AuthorCommentView, 'author-comments')

schema_view = get_schema_view(
    openapi.Info(
        #  add your swagger doc title
        title="TrueFriends API",
        #  version of the swagger doc
        default_version='v1',
        # first line that appears on the top of the doc
        description="Methods for the TrueFriends Social Network",
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(author_router.urls)),  #authors-list, authors-details?
    path('', include(post_router.urls)),  # posts-list, posts-details?
    #path('schema/', get_schema_view(title="TrueFriends API", permission_classes=(permissions.AllowAny,))),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/', include('User.urls')),
    path('api/auth/', include("User.urls")),
    path('friendrequest/', FRListView.as_view(), name="friend_request_list"),
    path('friendrequest/accept/<int:fr_id>/', FRAcceptView.as_view(), name="friend_request_accept"),

    path('friendrequest/from_external/<int:network_id>/<uuid:snd_uuid>/<str:snd_username>/send/<uuid:rec_uuid>/', FRSendFromExternalView.as_view(), name="friend_request_send_from_external"),
    path('friendrequest/to_external/<int:network_id>/<uuid:snd_uuid>/send/<str:rec_username>/<uuid:rec_uuid>/', FRSendToExternalView.as_view(), name="friend_request_send_to_external"),
    path('friendrequest/accept_external/sender/<uuid:snd_uuid>/recipient/<uuid:rec_uuid>/', FRAcceptExternalView.as_view(), name="friend_request_accept_external"),
    path('friendrequest/reject_external/sender/<uuid:snd_uuid>/recipient/<uuid:rec_uuid>/', FRRejectExternalView.as_view(), name="friend_request_reject_external"),

    path('friendrequest/reject/<int:fr_id>/', FRRejectView.as_view(), name="friend_request_reject"),
    path('friendrequest/<uuid:author_id>/', FRSendView.as_view(), name="friend_request_to_user"),
    path('authors/<uuid:author_id>/', include(post_router.urls)),  # authors-list, authors-detail?
    path('authors/<uuid:author_id>/', include(author_like_router.urls)),  # likes-list, likes-detail?
    path('posts/<uuid:post_id>/', include(post_like_router.urls)),  # post-likes-list, post-likes-detail?
    path('comments/<uuid:comment_id>/', include(comment_like_router.urls)),  # comments-likes-list, comments-likes-detail?
    path('authors/<uuid:author_id>/<str:author_username>/comments/<uuid:comment_id>/', include(comment_like_router.urls)),
    path('authors/<uuid:author_id>/inbox/', include('Inbox.urls')),  # inbox-list, inbox-detail?
    path('followers/', FollowersListView.as_view(), name="followers_list"),
    path('authors/<uuid:author_id>/followers/', FollowersListView.as_view(), name="followers_list"),
    path('following/', FollowingListView.as_view(), name="following_list"),
    path('unfollow/<uuid:user_id>/', UnfollowView.as_view(), name="unfollow_by_user_id"),
    path('unfriend/<uuid:user_id>/', UnfriendView.as_view(), name="unfriend_by_user_id"),
    path('<uuid:follower_id>/unfollow/<uuid:user_id>/', UnfollowView.as_view(), name="foreign_unfollow_by_user_id"),
    path('withdraw/<uuid:user_id>/', WithdrawView.as_view(), name="withdraw_by_user_id"),
    path('truefriends/', TrueFriendsListView.as_view(), name="true_friends_list"),
    path('posts/<uuid:post_id>/', include(post_comment_router.urls)),  # post-comments-list, post-comments-detail?
    path('authors/<uuid:author_id>/', include(author_comment_router.urls)),  # author-comments-list, author-comments-detail?
    path('currentauthor/', include(logged_in_post_router.urls)),  # my-posts-list, my-posts-detail?
    path('authors/<uuid:author_id>/<str:author_username>/', include(author_post_router.urls)),
    path('authors/<uuid:author_id>/<str:author_username>/posts/<uuid:post_id>/', include(foreign_like_router.urls)),
    path('authors/<uuid:author_id>/<str:author_username>/posts/<uuid:post_id>/', include(foreign_comment_router.urls)),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)