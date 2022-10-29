from rest_framework import serializers, viewsets, status, permissions, response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from ..User.models import Author
from .models import Follow


class FollowListView(GenericAPIView):
    def get(self, request):
        author = Author.objects.get(username=request.user.username).id
        follower_list = Follow.objects.filter(followee=author)

        f_list = []
        for f in follower_list:
            f_dict = {}
            f_id = f.id
            sender = Author.objects.get(id=f.follower.id)
            sender_id = f.follower.id
            sender_username = sender.username
            sender_first_name = sender.first_name
            sender_last_name = sender.last_name
            f_date = f.date
            f_dict.update({'id:': f_id})
            f_dict.update({'date': f_date})
            f_dict.update({'sender_id': sender_id})
            f_dict.update({'sender_username': sender_username})
            f_dict.update({'sender_first_name': sender_first_name})
            f_dict.update({'sender_last_name': sender_last_name})

            f_list.append(f_dict)

        return response.Response(f_list, status=status.HTTP_200_OK)
