from django.db import models
from User.models import Author
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid

# a post will have a container of likes
class Like(models.Model):
    type = models.CharField(default="like", editable=False, max_length=4)
    date = models.DateTimeField(auto_now_add=True)                    # when the like was done
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True, blank=True)  # the author who liked this
    post = models.ForeignKey('Post.Post', on_delete=models.CASCADE, null=True, blank=True) #The post associated to the like
    comment = models.ForeignKey('Comment.Comment', on_delete=models.CASCADE, null=True, blank=True) #The post associated to the like
    
    def save(self, *args, **kwargs):
        if self.comment:
            self.post = self.comment.post
        super(Like, self).save(*args, **kwargs)

    @property
    def summary(self):
        if self.comment:
            liked_object = "comment"
        else:
            liked_object = "post"
        return "{} likes your {}".format(str(self.author), liked_object)