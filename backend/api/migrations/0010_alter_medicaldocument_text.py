# Generated by Django 4.1.5 on 2023-03-11 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_medicaldocument"),
    ]

    operations = [
        migrations.AlterField(
            model_name="medicaldocument",
            name="text",
            field=models.CharField(blank=True, default="", max_length=50000, null=True),
        ),
    ]