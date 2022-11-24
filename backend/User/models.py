from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _

from Inbox.models import Inbox
from .managers import AuthorManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
import uuid

class Author(AbstractBaseUser, PermissionsMixin):
    """
    Custom User Model
    """


    username_validator = UnicodeUsernameValidator()

    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=True, max_length=100)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=30, unique=False)  # , validators=[username_validator]
    first_name = models.CharField(max_length=30, unique=False, default="")
    last_name = models.CharField(max_length=30, unique=False, default="")
    #friend_requests = models.ManyToOneRel()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    objects = AuthorManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        abstract = False

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the username for the user."""
        return self.username

    def __str__(self):
        return self.username

@staticmethod
def get_user(id_):
    try:
        return Author.objects.get(pk=id_) # <-- tried to get by email here
    except Author.DoesNotExist:
        return None


@receiver(post_save, sender=Author)
def add_post(instance, created, **kwargs):
    try:
        user_inbox = Inbox.objects.get(author=instance)
    except:
        user_inbox = Inbox.objects.create(author=instance)
