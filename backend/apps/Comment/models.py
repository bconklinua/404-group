from django.db import models
from ..User.models import Author


# a post will have a container of likes
class Comment(models.Model):
    date = models.DateTimeField(auto_now_add=True)                    # when the comment was made
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # the author who made the comment
    content = models.CharField(max_length=5000)
