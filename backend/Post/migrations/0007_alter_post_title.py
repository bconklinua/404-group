# Generated by Django 4.1.2 on 2022-11-30 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0006_alter_post_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(default='Untitled', max_length=30),
        ),
    ]