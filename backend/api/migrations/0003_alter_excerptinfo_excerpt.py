# Generated by Django 4.1.4 on 2022-12-28 07:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_excerpt_excerptinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='excerptinfo',
            name='excerpt',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.excerpt'),
        ),
    ]
