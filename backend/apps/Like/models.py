from django.db import models
from ..User.models import Author


# a post will have a container of likes
class Like(models.Model):
    date = models.DateTimeField(auto_now_add=True)                    # when the like was done
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # the author who liked this




