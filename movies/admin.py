from django.contrib import admin
from . import models


# Register your models here.

class MovieImageInline(admin.TabularInline):
    model = models.MovieImage
    extra = 1


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_top', 'category', 'age_limit')  # displaying on a page like a mini table
    list_filter = ('is_top', 'category', 'age_limit')
    list_editable = ('is_top', 'category', 'age_limit')  # opportunity to change without entering inside
    search_fields = ('title', 'description')
    inlines = (MovieImageInline,)
#   inlines =


admin.site.register(models.Movie, MovieAdmin)
admin.site.register(models.Video)
admin.site.register(models.MovieImage)
admin.site.register(models.Category)
