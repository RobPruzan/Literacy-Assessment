from django.contrib import admin

# Register your models here.
from .models import Excerpt, ExcerptInfo

admin.site.register(Excerpt)
admin.site.register(ExcerptInfo)
