# Generated by Django 4.1.2 on 2022-11-02 03:22

import apps.Post.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0004_alter_post_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=apps.Post.models.upload_to),
        ),
    ]
