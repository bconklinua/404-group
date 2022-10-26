from django.db import models
from ..User.models import Author
from ..Post.models import Post

CONTENT_TYPE_CHOICES = [
    ("text/markdown", "Common Mark"),
    ("text/plain", "UTF-8"),
    ("application/base64", "Base 64"),
    ("image/png;base64", "Base 64 Embedded PNG"),
    ("image/jpeg;base64", "Base 64 Embedded JPEG"),
]


# a post will have a container of likes
class Comment(models.Model):
    type = models.CharField(default="comment", editable=False, max_length=7)
    published = models.DateTimeField(auto_now_add=True)                    # when the comment was made
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # the author who made the comment
    comment = models.CharField(max_length=5000)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    contentType = models.CharField(choices = CONTENT_TYPE_CHOICES, max_length=100, default="")
