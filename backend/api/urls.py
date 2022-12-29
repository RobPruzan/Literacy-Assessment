from django.contrib import admin
from django.urls import include, path
from .views import CategoryView, ExcerptByCategoryView, ExcerptInfoView

urlpatterns = [
    path("api/excerpts_info", ExcerptInfoView.as_view()),
    path("api/excerpts/<int:category_id>", ExcerptByCategoryView.as_view()),
    path("api/categories", CategoryView.as_view()),
]
