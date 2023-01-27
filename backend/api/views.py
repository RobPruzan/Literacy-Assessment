from django.shortcuts import render
from print_color import print
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Collection, Excerpt, ExcerptInfo, User
from .NLP.main import (
    calculate_diversity,
    comparison_pipeline,
    get_readability_measures,
    misspelled_percentage,
    reading_difficulty,
    sliding_window,
)
from .serializers import CollectionSerializer, ExcerptInfoSerializer, UserSerializer
from .utils.apiHelpers import calculate_stats_and_respond
from .utils.dbHelpers import excerpt_ids_to_objects
from .utils.helpers import ids_are_valid, ids_to_calculation


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
            print("wah wah")
            return Response("No id provided")
        excerpts_info = ExcerptInfo.objects.filter(excerpt__collection_id=collection_id)

        serializer = ExcerptInfoSerializer(excerpts_info, many=True)

        return Response(serializer.data)


class CollectionView(APIView):
    def get(self, request, *args, **kwargs):

        collections = Collection.objects.filter(user__isnull=True)
        serializer = CollectionSerializer(collections, many=True)

        print("Sending collections", len(serializer.data), color="red")
        return Response(serializer.data)


class UserCollectionView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id is None:
            print("wah wah")
            return Response("No id provided")
        collections = Collection.objects.filter(user__id=user_id).order_by("-id")
        serializer = CollectionSerializer(collections, many=True)
        print(
            "Sending user collections",
            len(serializer.data),
            serializer.data,
            color="blue",
        )
        return Response(serializer.data)


class ExcerptDiversityView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, calculate_diversity)


class ExcerptDifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, reading_difficulty)


class ExcerptWindowDifficultyView(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, sliding_window)


class ExcerptReadabilityMeasures(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, get_readability_measures)


class ExcerptCalculateGrammar(APIView):
    def post(self, request, *args, **kwargs):
        return calculate_stats_and_respond(request, misspelled_percentage)


class ExcerptCompereText(APIView):
    def post(self, request, *args, **kwargs):
        selected_excerpts = request.data.get("excerpts")
        selected_excerpts_ids = [excerpt.get("id") for excerpt in selected_excerpts]
        excerpts_text = excerpt_ids_to_objects(selected_excerpts_ids)
        comparison_stats = comparison_pipeline(excerpts_text)
        return Response(comparison_stats)


class CreateCollectionView(APIView):
    def post(self, request, *args, **kwargs):

        user_id = request.data.get("user_id")
        try:
            User.objects.get(id=user_id)
        except User.DoesNotExist:
            print("User does not exist", color="red")
            return Response("User does not exist")
        # change name of keys in frontend to match the ones in the backend
        # Double accessing collection because of bad naming, the 2nd collection should be collectionContent
        collection_content = request.data.get("collection").get("collection")
        collection_title = request.data.get("collection").get(
            "title", "No Title Provided"
        )

        collection = Collection.objects.create(
            title=collection_title,
        )

        for excerpt in collection_content:
            if user_id is not None:
                excerpt = Excerpt.objects.create(
                    title=excerpt.get("title"),
                    text=excerpt.get("text"),
                    source_user_id=user_id,
                    collection_id=collection.id,
                )
                ExcerptInfo.objects.create(
                    excerpt_id=excerpt.id,
                )

        user = User.objects.filter(id=user_id).first()
        user.collections.add(collection)
        user.save()
        print(
            "Collection created, Collection: ",
            collection,
            len(collection.excerpts.all()),
            color="green",
        )
        return Response()
