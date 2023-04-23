from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models
from django.utils.translation import gettext_lazy as _


class CustomUserAdmin(UserAdmin):
    # The forms to add and change user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'user_type'),
        }),
    )
    list_display = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': (
            'first_name',
            'last_name',
            'user_type',
        )}),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(models.CustomUser, CustomUserAdmin)
# admin.site.register(models.CustomUser)
admin.site.register(models.Profile)
