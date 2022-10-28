from imp import source_from_cache
from tokenize import blank_re
from django.db import models
from ..User.models import Author
from ..Like.models import Like

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


# Create your models here.
class Post(models.Model):

    type = models.CharField(default="post", editable=False, max_length=4)
    title = models.CharField(max_length=30, default="Untitled", unique=True)
    source = models.SlugField(max_length=100, editable=False)
    origin = models.SlugField(max_length=100, editable=False)
    description = models.CharField(max_length=200, blank=True)
    contentType = models.CharField(choices = CONTENT_TYPE_CHOICES, max_length=100, default="UTF-8")
    content = models.TextField()
    count = models.IntegerField(default=0)
    author = models.ForeignKey(Author, null=True, on_delete=models.CASCADE, editable=False) #Switch to OneToOne field with User
    categories = models.ManyToManyField(Category, blank=True)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(choices=VISIBILITY_CHOICES, max_length=100, default="PUBLIC")
    unlisted = models.BooleanField(default=False)
        
    def get_categories(self):
        return "\n".join([str(c) for c in self.categories.all()])
    
    @property
    def count(self):
        return Like.objects.filter(post_id = self.id).count()
