from imp import source_from_cache
from tokenize import blank_re
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Inbox(models.Model):
    type = models.CharField(default="inbox", editable=False, max_length=8)
    author = models.OneToOneField('User.Author', on_delete=models.CASCADE)
    posts = models.ManyToManyField('Post.Post', blank=True)

@receiver(pre_delete, sender=Inbox)
def add_post(instance, **kwargs):
    instance.posts.clear()