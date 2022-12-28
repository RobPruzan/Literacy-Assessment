from django.contrib import admin
from django.urls import include, path
from .views import UserView, ExcerptInfoView

urlpatterns = [path("api/excerpts_info", ExcerptInfoView.as_view())]
