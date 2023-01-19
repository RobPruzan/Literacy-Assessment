from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200, default="")
    is_admin = models.BooleanField(null=False, default=False)
    collections = models.ManyToManyField("Category", blank=True)


class Excerpt(models.Model):
    title = models.CharField(max_length=200, default="")
    text = models.CharField(max_length=5000, default="")
    source = models.CharField(max_length=200, default="")


class ExcerptInfo(models.Model):
    # A OneToOneField is a foreign key with constraints that ensure that each object has exactly one object in the related model.
    excerpt = models.OneToOneField(Excerpt, on_delete=models.CASCADE)
    difficulty = models.IntegerField(null=False, default=0)
    diversity = models.IntegerField(null=False, default=0)
    text_length = models.IntegerField(null=False, default=0)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, null=True, blank=True
    )
    region = models.CharField(max_length=200, default="", null=True, blank=True)


class Category(models.Model):
    title = models.CharField(max_length=200, default="", null=True, blank=True)
    difficulty = models.IntegerField(default=0, null=True, blank=True)
    total_excerpts = models.IntegerField(default=0, null=True, blank=True)
