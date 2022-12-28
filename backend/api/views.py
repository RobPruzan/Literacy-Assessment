from rest_framework import generics
from django.shortcuts import render
from .models import ExcerptInfo, User
from .serializers import ExcerptInfoSerializer, UserSerializer
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
