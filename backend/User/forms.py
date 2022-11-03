from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Author


class AuthorCreationForm(UserCreationForm):

    class Meta:
        model = Author
        fields = ('email',)


class AuthorChangeForm(UserChangeForm):

    class Meta:
        model = Author
        fields = ('email',)
