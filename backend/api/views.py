from rest_framework import generics
from django.shortcuts import render
from .models import Category, ExcerptInfo, User
from .serializers import CategorySerializer, ExcerptInfoSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

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
