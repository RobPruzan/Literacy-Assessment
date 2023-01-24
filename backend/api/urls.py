from django.contrib import admin
from django.urls import include, path
from .views import (
    CalculateGrammar,
    CollectionView,
    CompereText,
    CreateCollectionView,
    DifficultyView,
    DiversityView,
    ExcerptByCollectionView,
    ExcerptInfoView,
    ReadabilityMeasures,
    UserCollectionView,
    UserView,
    WindowDifficultyView,
)

urlpatterns = [
    path("api/users", UserView.as_view()),
    path("api/excerpts_info", ExcerptInfoView.as_view()),
    path("api/excerpts/<int:collection_id>", ExcerptByCollectionView.as_view()),
    path("api/collections", CollectionView.as_view()),
    path("api/diversity", DiversityView.as_view()),
    path("api/difficulty", DifficultyView.as_view()),
    path("api/window_difficulty", WindowDifficultyView.as_view()),
    path("api/compare", CompereText.as_view()),
    path("api/grammar", CalculateGrammar.as_view()),
    path("api/readability", ReadabilityMeasures.as_view()),
    path("api/create_collection", CreateCollectionView.as_view()),
    path("api/user_collections/<int:user_id>", UserCollectionView.as_view()),
]
