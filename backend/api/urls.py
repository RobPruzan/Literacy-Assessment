from django.contrib import admin
from django.urls import include, path
from .views import (
    CalculateGrammer,
    CategoryView,
    CompereText,
    DifficultyView,
    DiversityView,
    ExcerptByCategoryView,
    ExcerptInfoView,
    ReadabilityMeasures,
    WindowDifficultyView,
)

urlpatterns = [
    path("api/excerpts_info", ExcerptInfoView.as_view()),
    path("api/excerpts/<int:category_id>", ExcerptByCategoryView.as_view()),
    path("api/categories", CategoryView.as_view()),
    path("api/diversity", DiversityView.as_view()),
    path("api/difficulty", DifficultyView.as_view()),
    path("api/window_difficulty", WindowDifficultyView.as_view()),
    path("api/compare", CompereText.as_view()),
    path("api/grammar", CalculateGrammer.as_view()),
    path("api/readability", ReadabilityMeasures.as_view()),
]
