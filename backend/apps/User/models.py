from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _
from .managers import AuthorManager


class Author(AbstractBaseUser, PermissionsMixin):
    """
    Custom User Model
    """

    username_validator = UnicodeUsernameValidator()

    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=30, unique=True)  # , validators=[username_validator]

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




