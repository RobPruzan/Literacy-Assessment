from django.contrib import admin
from django.urls import include, path
from .views import (
    CategoryView,
    DifficultyView,
    DiversityView,
    ExcerptByCategoryView,
    ExcerptInfoView,
    WindowDifficultyView,
)

urlpatterns = [
    path("api/excerpts_info", ExcerptInfoView.as_view()),
    path("api/excerpts/<int:category_id>", ExcerptByCategoryView.as_view()),
    path("api/categories", CategoryView.as_view()),
    path("api/diversity", DiversityView.as_view()),
    path("api/difficulty", DifficultyView.as_view()),
    path("api/window_difficulty", WindowDifficultyView.as_view()),
]
