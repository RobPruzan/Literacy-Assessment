from rest_framework import generics
from django.shortcuts import render

from .utils.helpers import ids_to_calculation, ids_are_valid

from .utils.dbHelpers import excerpt_ids_to_objects

from .utils.apiHelpers import calculate_stats_and_respond


from .NLP.main import (
    calculate_diversity,
    comparison_pipeline,
    misspelled_percentage,
    reading_difficulty,
    sliding_window,
    get_readability_measures,
)
from .models import Collection, Excerpt, ExcerptInfo, User
from .serializers import CollectionSerializer, ExcerptInfoSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print


# Create your views here.
class UserView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class ExcerptInfoView(APIView):
    def get(self, request, *args, **kwargs):
        excerpts_info = ExcerptInfo.objects.all()
        serializer = ExcerptInfoSerializer(excerpts_info, many=True)
        return Response(serializer.data)


class ExcerptByCollectionView(APIView):
    def get(self, request, *args, **kwargs):
        collection_id = kwargs.get("collection_id")
        if collection_id is None:
            return Response("No id provided")
        excerpts_info = ExcerptInfo.objects.filter(collection_id=collection_id)
        serializer = ExcerptInfoSerializer(excerpts_info, many=True)

        return Response(serializer.data)


class CollectionView(APIView):
    def get(self, request, *args, **kwargs):
        categories = Collection.objects.all()
        serializer = CollectionSerializer(categories, many=True)
        return Response(serializer.data)


class DiversityView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, calculate_diversity)


class DifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, reading_difficulty)


class WindowDifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, sliding_window)


class ReadabilityMeasures(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, get_readability_measures)


class CalculateGrammar(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, misspelled_percentage)


class CompereText(APIView):
    def post(self, request, *args, **kwargs):
        selected_excerpts = request.data.get("excerpts")
        selected_excerpts_ids = [excerpt.get("id") for excerpt in selected_excerpts]
        excerpts_text = excerpt_ids_to_objects(selected_excerpts_ids)
        comparison_stats = comparison_pipeline(excerpts_text)
        return Response(comparison_stats)


class CreateCollectionView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        user = User.objects.filter(user_id=user_id).first()
        collection = Collection.objects.create(
            title=request.data.get("collection_title", None),
        )
        excerpts = request.data.get("excerpts")

        for excerpt in excerpts:
            source_user_id = User.objects.filter(id=user_id).first()
            if source_user_id:
                Excerpt.objects.create(
                    title=excerpt.get("title"),
                    text=excerpt.get("text"),
                    source_user_id=User.objects.filter(id=user_id).first().id,
                    collection_id=collection.id,
                )
        user.collections.add(collection)
        user.save()
        return Response()
