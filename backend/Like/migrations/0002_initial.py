# Generated by Django 4.1.2 on 2022-11-25 05:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Comment', '0002_initial'),
        ('Post', '0001_initial'),
        ('Like', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='like',
            name='comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Comment.comment'),
        ),
        migrations.AddField(
            model_name='like',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Post.post'),
        ),
    ]
