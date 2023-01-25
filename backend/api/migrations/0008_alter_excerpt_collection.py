# Generated by Django 4.1.5 on 2023-01-24 19:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_excerpt_text_alter_excerpt_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="excerpt",
            name="collection",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="excerpts",
                to="api.collection",
            ),
        ),
    ]