from typing import OrderedDict
from rest_framework import serializers, viewsets, status, permissions, response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import FriendRequestSerializer
from .models import FriendRequest
from ..User.models import Author


class FRSendView(GenericAPIView):
    #authentication_classes = []  # temp stuff
    permission_classes = (permissions.AllowAny,)
    serializer_class = FriendRequestSerializer

    def post(self, request, author_id):
        recipient_id = self.kwargs['author_id']
        sender = Author.objects.get(username=request.user.username).id
        recipient = Author.objects.get(id=recipient_id).id

        fr_list = FriendRequest.objects.filter(sender=sender, recipient=recipient)
        print("FR", fr_list)
        if len(fr_list) > 0:
            return response.Response({"error": "friend request already exists"}, status=status.HTTP_409_CONFLICT)

        # get a copy of the request as a mutable dict object
        updated_request = request.POST.copy()
        updated_request.update({'sender': sender})
        updated_request.update({'recipient': recipient})
        serializer = self.serializer_class(data=updated_request)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FRListView(GenericAPIView):
    def get(self, request):
        author = Author.objects.get(username=request.user.username).id
        fr_list = FriendRequest.objects.filter(recipient=author)

        friend_request_list = []
        for fr in fr_list:
            fr_dict = {}
            fr_id = fr.id
            fr_author = Author.objects.get(id=fr.sender.id)
            sender_id = fr.sender.id
            sender_username = fr_author.username
            sender_first_name = fr_author.first_name
            sender_last_name = fr_author.last_name
            #recipient_id = fr.recipient.id
            fr_date = fr.date
            fr_dict.update({'id:' : fr_id})
            fr_dict.update({'date': fr_date})
            fr_dict.update({'sender_id' : sender_id})
            fr_dict.update({'sender_username': sender_username})
            fr_dict.update({'sender_first_name': sender_first_name})
            fr_dict.update({'sender_last_name': sender_last_name})
            #fr_dict.update({'recipient': recipient_id})
            friend_request_list.append(fr_dict)



        return response.Response(friend_request_list, status=status.HTTP_200_OK)



