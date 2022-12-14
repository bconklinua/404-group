from django.db import models
from User.models import Author
import uuid
from Like.models import Like


CONTENT_TYPE_CHOICES = [
    ("text/markdown", "Common Mark"),
    ("text/plain", "UTF-8"),
    ("application/base64", "Base 64"),
    ("image/png;base64", "Base 64 Embedded PNG"),
    ("image/jpeg;base64", "Base 64 Embedded JPEG"),
]


# a post will have a container of likes
class Comment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=True)
    type = models.CharField(default="comment", editable=False, max_length=7)
    published = models.DateTimeField(auto_now_add=True)                    # when the comment was made
    author = models.ForeignKey(Author, on_delete=models.CASCADE,null=True, blank=True)  # the author who made the comment
    comment = models.CharField(max_length=5000)
    post = models.ForeignKey('Post.Post', on_delete=models.CASCADE, null=True, blank=True)
    contentType = models.CharField(choices = CONTENT_TYPE_CHOICES, max_length=100, default="text/plain")
    count = models.IntegerField(default=0)

    @property
    def count(self):
        return Like.objects.filter(comment_id = self.id).count()