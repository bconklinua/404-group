from django.db import models
from ..User.models import Author


# a post will have a container of likes
class FriendRequest(models.Model):
    objects = models.manager
    date = models.DateTimeField(auto_now_add=True)                    # when the request was sent
    sender = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='fr_recipient', default=None, null=True, blank=True)  # the author who sent the request
    recipient = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='fr_sender', default=None, null=True, blank=True)  # the author who received the request

