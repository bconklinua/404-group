from django.db import models
from User.models import Author
from django.utils.translation import gettext as _


class FriendRequest(models.Model):

    NETWORK_CHOICES = (
        ('local', _('A True TrueFriends To TrueFriends Friend Request')),
        ('truefriends_to_team13', _('Friend Request From TrueFriends to the Team 13 Network')),
        ('team13_to_truefriends', _('Friend Request From the Team 13 Network to TrueFriends')),
        ('truefriends_to_team19', _('Friend Request From TrueFriends to the Team 19 Network')),
        ('team19_to_truefriends', _('Friend Request From the Team 19 Network to TrueFriends')),
        ('truefriends_to_team10', _('Friend Request From TrueFriends to the Team 10 Network')),
        ('team10_to_truefriends', _('Friend Request From the Team 10 Network to TrueFriends'))
    )

    objects = models.manager
    date = models.DateTimeField(auto_now_add=True)                    # when the request was sent
    sender = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='fr_recipient', default=None, null=True, blank=True)  # the author who sent the request
    recipient = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='fr_sender', default=None, null=True, blank=True)  # the author who received the request
    network = models.CharField(max_length=64, choices=NETWORK_CHOICES, default='local')

