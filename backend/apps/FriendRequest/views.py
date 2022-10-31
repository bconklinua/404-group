from typing import OrderedDict
from rest_framework import serializers, viewsets, status, permissions, response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import FriendRequestSerializer
from .models import FriendRequest
from ..User.models import Author
from ..Follow.models import Follow


class FRSendView(GenericAPIView):
    #authentication_classes = []  # temp stuff
    # permission_classes = (permissions.AllowAny,)
    serializer_class = FriendRequestSerializer

    def post(self, request, author_id):
        recipient_id = self.kwargs['author_id']
        sender = Author.objects.get(username=request.user.username).id
        recipient = Author.objects.get(id=recipient_id).id

        fr_list = FriendRequest.objects.filter(sender=sender, recipient=recipient)
        if len(fr_list) > 0:
            return response.Response({"error": "friend request already exists"}, status=status.HTTP_409_CONFLICT)
        follow_list = Follow.objects.filter(follower=sender, followee=recipient)
        if len(follow_list) > 0:
            return response.Response({"error": "can't send a friend request to someone you are already following!"}, status=status.HTTP_409_CONFLICT)

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

    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
    

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

            fr_date = fr.date
            fr_dict.update({'id' : fr_id})
            fr_dict.update({'date': fr_date})
            fr_dict.update({'sender_id' : sender_id})
            fr_dict.update({'sender_username': sender_username})
            fr_dict.update({'sender_first_name': sender_first_name})
            fr_dict.update({'sender_last_name': sender_last_name})

            friend_request_list.append(fr_dict)

        return response.Response(friend_request_list, status=status.HTTP_200_OK)


class FRAcceptView(GenericAPIView):

    serializer_class = FriendRequestSerializer

    def post(self, request, fr_id):
        fr_id = self.kwargs['fr_id']
        f_req = FriendRequest.objects.get(id=fr_id)
        if f_req.recipient.id != request.user.id:
            return response.Response({"error": "invalid friend request for user"}, status=status.HTTP_400_BAD_REQUEST)

        print("valid friend request for user", request.user.username)
        follower_author = Author.objects.get(id=f_req.sender.id)
        followee_author = Author.objects.get(id=request.user.id)

        follow_list = Follow.objects.filter(follower=follower_author, followee=followee_author)
        if len(follow_list) > 0:
            return response.Response({"error": "already being followed"}, status=status.HTTP_409_CONFLICT)

        follow = Follow(follower=follower_author, followee=followee_author)
        f_req.delete()
        follow.save()

        response_dict = {}
        response_dict.update({"message": "you accepted " + follower_author.username + " as a follower"})

        followed_back = Follow.objects.filter(follower=followee_author, followee=follower_author)
        if len(followed_back) > 0:
            response_dict.update({"true_friend": "you and " + follower_author.username + " are officially true friends."})

        return response.Response(response_dict, status=status.HTTP_200_OK)


class FRRejectView(GenericAPIView):

    serializer_class = FriendRequestSerializer

    def post(self, request, fr_id):
        fr_id = self.kwargs['fr_id']
        f_req = FriendRequest.objects.get(id=fr_id)
        if f_req.recipient.id != request.user.id:
            return response.Response({"error": "invalid friend request for user"}, status=status.HTTP_400_BAD_REQUEST)
        follower_author = Author.objects.get(id=f_req.sender.id)
        response_dict = {}
        response_dict.update({"message": "you rejected " + follower_author.username + " as a follower"})
        f_req.delete()

        return response.Response(response_dict, status=status.HTTP_200_OK)