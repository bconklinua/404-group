# Generated by Django 4.1.2 on 2022-12-05 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0009_alter_post_original_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='original_author_id',
            field=models.UUIDField(blank=True, null=True),
        ),
    ]
