# Generated by Django 4.1.2 on 2022-10-25 19:39

from django.db import migrations, models


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
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='post', editable=False, max_length=4)),
                ('title', models.CharField(default='Untitled', max_length=30, unique=True)),
                ('source', models.SlugField(editable=False, max_length=100)),
                ('origin', models.SlugField(editable=False, max_length=100)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('contentType', models.CharField(choices=[('text/markdown', 'Common Mark'), ('text/plain', 'UTF-8'), ('application/base64', 'Base 64'), ('image/png;base64', 'Base 64 Embedded PNG'), ('image/jpeg;base64', 'Base 64 Embedded JPEG')], max_length=100)),
                ('content', models.TextField()),
                ('count', models.IntegerField(default=0, editable=False)),
                ('comments', models.URLField(default='', max_length=100)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('visibility', models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('FRIENDS', 'FRIENDS')], default='PUBLIC', max_length=100)),
                ('unlisted', models.BooleanField(default=False)),
            ],
        ),
    ]
