from typing import OrderedDict

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers, viewsets, status, permissions, response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import FriendRequestSerializer
from .models import FriendRequest
from User.models import Author
from Follow.models import Follow


class FRSendView(GenericAPIView):
    #authentication_classes = []  # temp stuff
    # permission_classes = (permissions.AllowAny,)
    serializer_class = FriendRequestSerializer

    def post(self, request, author_id):
        recipient_id = self.kwargs['author_id']
        sender = Author.objects.get(username=request.user.username).id
        recipient = Author.objects.get(id=recipient_id).id

        # noinspection DuplicatedCode
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

        follower_author = Author.objects.get(id=f_req.sender.id)
        followee_author = Author.objects.get(id=request.user.id)

        # noinspection DuplicatedCode
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


class FRAcceptExternalView(GenericAPIView):

    serializer_class = FriendRequestSerializer

    def post(self, request, snd_uuid, rec_uuid):
        sender_uuid = self.kwargs['snd_uuid']
        recipient_uuid = self.kwargs['rec_uuid']

        try:
            author_sender = Author.objects.get(id=sender_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "invalid parameter for sender"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            author_recipient = Author.objects.get(id=recipient_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "that recipient does not exist in our database - was a friend request sent to them?"})

        f_req = FriendRequest.objects.filter(sender=author_sender, recipient=author_recipient)
        if f_req is None:
            return response.Response({"error": "no friend request exists between those users"}, status=status.HTTP_400_BAD_REQUEST)

        # somehow check if the user accepting this request is the one authorized to do so
        # if f_req.recipient.id != request.user.id:
        #    return response.Response({"error": "invalid friend request for user"}, status=status.HTTP_400_BAD_REQUEST)

        follow_list = Follow.objects.filter(follower=author_sender, followee=author_recipient)
        if len(follow_list) > 0:
            return response.Response({"error": "already being followed"}, status=status.HTTP_409_CONFLICT)

        follow = Follow(follower=author_sender, followee=author_recipient)
        f_req.delete()
        follow.save()

        response_dict = {}
        response_dict.update({"message": "you accepted " + author_sender.username + " as a follower"})

        followed_back = Follow.objects.filter(follower=author_recipient, followee=author_sender)
        if len(followed_back) > 0:
            response_dict.update({"true_friend": "you and " + author_sender.username + " are officially true friends."})

        return response.Response(response_dict, status=status.HTTP_200_OK)


class FRSendFromExternalView(GenericAPIView):
    serializer_class = FriendRequestSerializer

    def post(self, request, network_id, snd_uuid, snd_username, rec_uuid):

        if network_id != 13 and network_id != 19:
            return response.Response({"error": "invalid network ID: " + network_id}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipient = Author.objects.get(id=rec_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "recipient user with that UUID does not exist"})

        try:
            sender = Author.objects.filter(username=snd_username).get(id=snd_uuid)
        except ObjectDoesNotExist:
            if network_id == 13:
                sender = Author.objects.create(id=snd_uuid, username=snd_username, email=snd_username + "@gmail.com",
                                               password="password123", host='Team13')
            if network_id == 19:
                sender = Author.objects.create(id=snd_uuid, username=snd_username, email=snd_username + "@gmail.com",
                                               password="password123", host='Team19')

        # noinspection DuplicatedCode
        fr_list = FriendRequest.objects.filter(sender=sender, recipient=recipient)

        if len(fr_list) > 0:
            return response.Response({"error": "friend request already exists"}, status=status.HTTP_409_CONFLICT)
        follow_list = Follow.objects.filter(follower=sender, followee=recipient)
        if len(follow_list) > 0:
            return response.Response({"error": "can't send a friend request to someone you are already following!"}, status=status.HTTP_409_CONFLICT)
        # get a copy of the request as a mutable dict object
        updated_request = request.POST.copy()
        updated_request.update({'sender': snd_uuid})
        updated_request.update({'recipient': rec_uuid})
        if network_id == 13:
            updated_request.update({'network': 'team13_to_truefriends'})
        if network_id == 19:
            updated_request.update({'network': 'team19_to_truefriends'})
        serializer = self.serializer_class(data=updated_request)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FRSendToExternalView(GenericAPIView):
    serializer_class = FriendRequestSerializer

    def post(self, request, network_id, snd_uuid, rec_username, rec_uuid):

        if network_id != 13 and network_id != 19:
            return response.Response({"error": "invalid network ID: " + network_id}, status=status.HTTP_400_BAD_REQUEST)


        try:
            sender = Author.objects.get(id=snd_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "sender author with that UUID does not exist"},
                                     status=status.HTTP_400_BAD_REQUEST)

        try:
            recipient = Author.objects.filter(username=rec_username).get(id=rec_uuid)
        except ObjectDoesNotExist:
            if network_id == 13:
                recipient = Author.objects.create(id=rec_uuid, username=rec_username, email=rec_username + "@gmail.com",
                                                  password="password123", host='Team13')
            if network_id == 19:
                recipient = Author.objects.create(id=rec_uuid, username=rec_username, email=rec_username + "@gmail.com",
                                                  password="password123", host='Team19')

        # noinspection DuplicatedCode
        fr_list = FriendRequest.objects.filter(sender=sender, recipient=recipient)

        if len(fr_list) > 0:
            return response.Response({"error": "friend request already exists"}, status=status.HTTP_409_CONFLICT)
        follow_list = Follow.objects.filter(follower=sender, followee=recipient)
        if len(follow_list) > 0:
            return response.Response({"error": "can't send a friend request to someone you are already following!"},
                                     status=status.HTTP_409_CONFLICT)

        # get a copy of the request as a mutable dict object
        updated_request = request.POST.copy()
        updated_request.update({'sender': snd_uuid})
        updated_request.update({'recipient': rec_uuid})
        if network_id == 13:
            updated_request.update({'network': 'truefriends_to_team13'})
        if network_id == 19:
            updated_request.update({'network': 'truefriends_to_team19'})
        serializer = self.serializer_class(data=updated_request)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FRRejectExternalView(GenericAPIView):

    serializer_class = FriendRequestSerializer

    def post(self, request, snd_uuid, rec_uuid):

        try:
            author_snd = Author.objects.get(id=snd_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "sender author with that UUID does not exist - are you sure this request is valid?"})

        try:
            author_rec = Author.objects.get(id=rec_uuid)
        except ObjectDoesNotExist:
            return response.Response({"error": "recipient author with that UUID does not exist - are you sure this request is valid?"})

        f_req = FriendRequest.objects.get(sender=author_snd.id, recipient=author_rec.id)

        response_dict = {}
        response_dict.update({"message": "you rejected " + author_snd.username + " as a follower"})
        f_req.delete()

        return response.Response(response_dict, status=status.HTTP_200_OK)