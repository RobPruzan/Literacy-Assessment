from rest_framework import serializers
from .models import Category, Excerpt, ExcerptInfo, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "is_admin")


class ExcerptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excerpt
        fields = ("id", "text", "title", "source")


class ExcerptSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Excerpt
        fields = ("id", "title", "source")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title", "difficulty", "total_excerpts")


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
