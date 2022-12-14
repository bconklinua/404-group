from django.shortcuts import render
from rest_framework import viewsets
from .serializers import InboxSerializer
from .models import Inbox
from rest_framework.response import Response
# Create your views here.

class InboxView(viewsets.ModelViewSet):
    serializer_class = InboxSerializer

    def get_queryset(self):
        user_id = self.kwargs['author_id']
        if user_id:
            return Inbox.objects.filter(author_id=user_id)
        return super().get_queryset()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = InboxSerializer(instance=instance)
        return Response(serializer.data)