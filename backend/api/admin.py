from django.contrib import admin

# Register your models here.
from .models import Collection, Excerpt, ExcerptInfo, MedicalDocument

admin.site.register(Excerpt)
admin.site.register(ExcerptInfo)
admin.site.register(Collection)
admin.site.register(MedicalDocument)
