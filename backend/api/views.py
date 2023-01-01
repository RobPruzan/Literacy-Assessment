from rest_framework import generics
from django.shortcuts import render

from .NLP.main import (
    calculate_diversity,
    comparison_pipeline,
    reading_difficulty,
    sliding_window,
)
from .models import Category, Excerpt, ExcerptInfo, User
from .serializers import CategorySerializer, ExcerptInfoSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ExcerptInfoView(APIView):
    def get(self, request, *args, **kwargs):
        experpts_info = ExcerptInfo.objects.all()
        serializer = ExcerptInfoSerializer(experpts_info, many=True)
        print(serializer.data)
        return Response(serializer.data)


class ExcerptByCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        print("the id should be", kwargs, args, request.data)
        category_id = kwargs.get("category_id")
        if category_id is None:
            return Response("No id provided")
        experpts_info = ExcerptInfo.objects.filter(category_id=category_id)
        serializer = ExcerptInfoSerializer(experpts_info, many=True)

        return Response(serializer.data)


class CategoryView(APIView):
    def get(self, request, *args, **kwargs):
        print("maybe this", kwargs)
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)


class CompareDataView(APIView):
    def get(self, request, *args, **kwargs):
        pass


class DiversityView(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get("excerpt")
        diversity = calculate_diversity(text)
        print(diversity, color="green")
        return Response(diversity)


class DifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get("excerpt")
        difficulty = reading_difficulty(text)

        return Response(difficulty)


class WindowDifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get("excerpt")
        difficulty = sliding_window(text)
        print("difficulty", difficulty, color="blue")
        return Response(difficulty)


class CompereText(APIView):
    def post(self, request, *args, **kwargs):
        selected_excerpts = request.data.get("excerpts")
        selected_excerpts_ids = [excerpt.get("id") for excerpt in selected_excerpts]
        excerpts_text = [
            Excerpt.objects.get(id=excerpt_id).text
            for excerpt_id in selected_excerpts_ids
        ]
        comparison_stats = comparison_pipeline(excerpts_text)
        return Response(comparison_stats)
