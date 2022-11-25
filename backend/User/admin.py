from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import AuthorCreationForm, AuthorChangeForm
from .models import Author


class AuthorAdmin(UserAdmin):
    add_form = AuthorCreationForm
    form = AuthorChangeForm

    model = Author

    list_display = ('username', 'email', 'is_active',
                    'is_staff', 'is_superuser', 'last_login',)
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'account_type')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(Author, AuthorAdmin)
