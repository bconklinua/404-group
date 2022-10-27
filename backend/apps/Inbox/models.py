from imp import source_from_cache
from tokenize import blank_re
from django.contrib.postgres.fields import ArrayField
from django.db import models
from ..User.models import Author
from ..Post.models import Post

class Inbox(models.Model):
    type = models.CharField(default="inbox", editable=False, max_length=4)
    author = models.OneToOneField(Author, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post)
