from imp import source_from_cache
from tokenize import blank_re
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from Follow.models import Follow
from User.models import Author
from Like.models import Like
from Inbox.models import Inbox
from django.core.exceptions import ObjectDoesNotExist

CONTENT_TYPE_CHOICES = [
    ("text/markdown", "Common Mark"),
    ("text/plain", "UTF-8"),
    ("application/base64", "Base 64"),
    ("image/png;base64", "Base 64 Embedded PNG"),
    ("image/jpeg;base64", "Base 64 Embedded JPEG"),
]

VISIBILITY_CHOICES = [
    ("PUBLIC", "PUBLIC"),
    ("FRIENDS", "FRIENDS"),
]

class Category(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Create your models here.
class Post(models.Model):

    type = models.CharField(default="post", editable=False, max_length=4)
    title = models.CharField(max_length=30, default="Untitled", unique=True)
    source = models.SlugField(max_length=100, editable=False)
    origin = models.SlugField(max_length=100, editable=False)
    description = models.CharField(max_length=200, blank=True)
    contentType = models.CharField(choices = CONTENT_TYPE_CHOICES, max_length=100, default="UTF-8")
    content = models.TextField(blank=True, null=True)
    count = models.IntegerField(default=0)
    author = models.ForeignKey(Author, null=True, on_delete=models.CASCADE) #Switch to OneToOne field with User
    categories = models.ManyToManyField(Category, blank=True)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(choices=VISIBILITY_CHOICES, max_length=100, default="PUBLIC")
    unlisted = models.BooleanField(default=False)
    image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    image_url = models.CharField(default="", null=True, blank=True, max_length=100)
        
    def get_categories(self):
        return "\n".join([str(c) for c in self.categories.all()])
    
    @property
    def count(self):
        return Like.objects.filter(post_id = self.id).count()

    def publish_post(self):
        #Get list of people who are following the author of this post
        follower_list = [f.follower for f in Follow.objects.filter(followee=self.author)]
        following_list = [f.followee for f in Follow.objects.filter(follower=self.author)]
        
        for follower in follower_list:
            try:
                inbox = Inbox.objects.get(author=follower)
            except ObjectDoesNotExist:
                inbox = Inbox.objects.create(author=follower)
            if self not in inbox.posts.all():
                if self.visibility == "FRIENDS" and (follower not in following_list):
                    continue
                inbox.posts.add(self)
        return

@receiver(post_save, sender=Post)
def add_post(instance, created, **kwargs):
    try:
        user_inbox = Inbox.objects.get(author=instance.author)
    except ObjectDoesNotExist:
        user_inbox = Inbox.objects.create(author=instance.author)
    if not user_inbox:
        user_inbox = Inbox.objects.create(author=instance.author)
        user_inbox.posts.create(instance)
    elif instance not in user_inbox.posts.all():
        user_inbox.posts.add(instance)
    #If the post is not marked as "unlisted", then publish the post
    if not instance.unlisted:
        instance.publish_post()