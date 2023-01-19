from rest_framework import serializers
from .models import Category, Excerpt, ExcerptInfo, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title", "difficulty", "total_excerpts")


class UserSerializer(serializers.ModelSerializer):
    collections = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = "__all__"


class ExcerptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excerpt
        fields = ("id", "text", "title", "source")


class ExcerptSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Excerpt
        fields = ("id", "title", "source")


class ExcerptInfoSerializer(serializers.ModelSerializer):
    excerpt = ExcerptSerializerMinimal()
    category = CategorySerializer()

    class Meta:
        model = ExcerptInfo
        fields = (
            "id",
            "excerpt",
            "difficulty",
            "diversity",
            "text_length",
            "category",
            "region",
        )

    # def to_representation(self, instance):
    #     ret = super().to_representation(instance)
    #     # get length of words in excerpt
    #     ret['count'] = len(ret['excerpt'].split())
    #     return ret
