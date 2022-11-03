from django.db import models
from User.models import Author


class Follow(models.Model):
    objects = models.manager
    date = models.DateTimeField(auto_now_add=True)                    # when the request was sent
    follower = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='Following_author', default=None, null=True, blank=True)  # the author who is following
    followee = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='followed_by', default=None, null=True, blank=True)  # the author being followed