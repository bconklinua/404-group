# Generated by Django 4.1.2 on 2022-11-28 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0005_alter_post_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image_url',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
