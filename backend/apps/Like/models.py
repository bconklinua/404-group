from tkinter import CASCADE
from xml.etree.ElementTree import Comment
from django.db import models
from ..User.models import Author

# a post will have a container of likes
class Like(models.Model):
    type = models.CharField(default="like", editable=False, max_length=4)
    summary = models.CharField(default="Anonymous likes your post", max_length=100, editable=False)
    date = models.DateTimeField(auto_now_add=True)                    # when the like was done
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # the author who liked this
    post = models.ForeignKey('Post.Post', on_delete=models.CASCADE, null=True, blank=True) #The post associated to the like
    comment = models.ForeignKey('Comment.Comment', on_delete=models.CASCADE, null=True, blank=True) #The post associated to the like

    def save(self, *args, **kwargs):
        if self.comment:
            self.post = None
        super(Like, self).save(*args, **kwargs)


