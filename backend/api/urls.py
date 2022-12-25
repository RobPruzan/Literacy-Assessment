from django.contrib import admin
from django.urls import include, path
from .views import UserView, ReactView

urlpatterns = [path("api", ReactView.as_view())]  # type: ignore
