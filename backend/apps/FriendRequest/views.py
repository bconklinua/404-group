from typing import OrderedDict
from rest_framework import serializers, viewsets, status, permissions, response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import FriendRequestSerializer
from .models import FriendRequest
from ..User.models import Author


'''
class FriendRequestView(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer

    def create(self, request, *args, **kwargs):
        receiver_id = self.kwargs['author_id']
        receiver = Author.objects.get(id=receiver_id)
        serializer = self.serializer_class(data=request.data)
        print("receiver id:", receiver.username)
        if serializer.is_valid():
            serializer.save(sender=request.user, receiver=receiver.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        print("retrieve was called:", request)
        serializer = FriendRequestSerializer(instance=instance)
        return Response(serializer.data)
'''

class FR_View(GenericAPIView):
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
