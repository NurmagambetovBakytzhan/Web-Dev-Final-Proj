from django.contrib import admin
from . import models


class CustomUserAdmin(admin.ModelAdmin):
    # The forms to add and change user

    list_display = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(models.CustomUser, CustomUserAdmin)
# admin.site.register(models.CustomUser)
admin.site.register(models.Profile)
