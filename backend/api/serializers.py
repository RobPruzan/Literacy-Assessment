from print_color import print
from rest_framework import serializers

from .models import Collection, Excerpt, ExcerptInfo, User


class CollectionSerializer(serializers.ModelSerializer):
    excerpt_ids = serializers.SerializerMethodField()

    def get_excerpt_ids(self, obj):
        print(
            obj.excerpts.all(),
        )
        return [e.id for e in obj.excerpts.all()]

    class Meta:
        model = Collection
        fields = ("id", "title", "difficulty", "total_excerpts", "excerpt_ids")


class UserSerializer(serializers.ModelSerializer):
    collections = CollectionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = "__all__"


class ExcerptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excerpt
        fields = ("id", "text", "title", "source")


class ExcerptSerializerMinimal(serializers.ModelSerializer):
    collection = CollectionSerializer()

    class Meta:
        model = Excerpt
        fields = ["id", "title", "collection"]


class ExcerptInfoSerializer(serializers.ModelSerializer):
    excerpt = ExcerptSerializerMinimal()

    class Meta:
        model = ExcerptInfo
        fields = (
            "id",
            "excerpt",
            "difficulty",
            "diversity",
            "text_length",
            "region",
        )

    # def to_representation(self, instance):
    #     ret = super().to_representation(instance)
    #     # get length of words in excerpt
    #     ret['count'] = len(ret['excerpt'].split())
    #     return ret
