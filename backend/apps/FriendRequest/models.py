from django.db import models
from ..User.models import Author


# a post will have a container of likes
class FriendRequest(models.Model):
    type = models.CharField(editable=False, default="author", max_length=5)
    summary = models.CharField(editable=False, max_length=100)
    date = models.DateTimeField(auto_now_add=True)                    # when the request was sent
    sender = models.ForeignKey(Author, on_delete=models.CASCADE)  # the author who sent the request
    # received = models.ForeignKey(Author, on_delete=models.CASCADE)