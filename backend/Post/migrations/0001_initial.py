# Generated by Django 4.1.2 on 2022-11-25 20:35

import Post.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('type', models.CharField(default='post', editable=False, max_length=4)),
                ('title', models.CharField(default='Untitled', max_length=30, unique=True)),
                ('source', models.SlugField(editable=False, max_length=100)),
                ('origin', models.SlugField(editable=False, max_length=100)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('contentType', models.CharField(choices=[('text/markdown', 'Common Mark'), ('text/plain', 'UTF-8'), ('application/base64', 'Base 64'), ('image/png;base64', 'Base 64 Embedded PNG'), ('image/jpeg;base64', 'Base 64 Embedded JPEG')], default='UTF-8', max_length=100)),
                ('content', models.TextField(blank=True, null=True)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('visibility', models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('FRIENDS', 'FRIENDS')], default='PUBLIC', max_length=100)),
                ('unlisted', models.BooleanField(default=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to=Post.models.upload_to)),
                ('image_url', models.CharField(blank=True, default='', max_length=100, null=True)),
            ],
        ),
    ]
