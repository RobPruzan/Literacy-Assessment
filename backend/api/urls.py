from django.contrib import admin
from django.urls import include, path

from .views import (
    CollectionView,
    CreateCollectionView,
    ExcerptByCollectionView,
    ExcerptCalculateGrammar,
    ExcerptCompereText,
    ExcerptDifficultyView,
    ExcerptDiversityView,
    ExcerptInfoView,
    ExcerptReadabilityMeasures,
    ExcerptWindowDifficultyView,
    UserCollectionView,
    UserView,
)

urlpatterns = [
    path("api/users", UserView.as_view()),
    path("api/excerpts_info", ExcerptInfoView.as_view()),
    path("api/excerpts/<int:collection_id>", ExcerptByCollectionView.as_view()),
    path("api/collections", CollectionView.as_view()),
    path("api/diversity", ExcerptDiversityView.as_view()),
    path("api/difficulty", ExcerptDifficultyView.as_view()),
    path("api/window_difficulty", ExcerptWindowDifficultyView.as_view()),
    path("api/compare", ExcerptCompereText.as_view()),
    path("api/grammar", ExcerptCalculateGrammar.as_view()),
    path("api/readability", ExcerptReadabilityMeasures.as_view()),
    path("api/create_collection", CreateCollectionView.as_view()),
    path("api/user_collections/<int:user_id>", UserCollectionView.as_view()),
]
