from rest_framework import generics
from django.shortcuts import render

from .utils.helpers import ids_to_calculation, ids_are_valid

from .utils.dbHelpers import excerpt_ids_to_objecsts

from .utils.apiHelpers import calculate_stats_and_respond


from .NLP.main import (
    calculate_diversity,
    comparison_pipeline,
    misspelled_percentage,
    reading_difficulty,
    sliding_window,
    get_readability_measures,
)
from .models import Category, Excerpt, ExcerptInfo, User
from .serializers import CategorySerializer, ExcerptInfoSerializer, UserSerializer
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
        experpts_info = ExcerptInfo.objects.all()
        serializer = ExcerptInfoSerializer(experpts_info, many=True)
        return Response(serializer.data)


class ExcerptByCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        category_id = kwargs.get("category_id")
        if category_id is None:
            return Response("No id provided")
        experpts_info = ExcerptInfo.objects.filter(category_id=category_id)
        serializer = ExcerptInfoSerializer(experpts_info, many=True)

        return Response(serializer.data)


class CategoryView(APIView):
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
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
        excerpts_text = excerpt_ids_to_objecsts(selected_excerpts_ids)
        comparison_stats = comparison_pipeline(excerpts_text)
        return Response(comparison_stats)
