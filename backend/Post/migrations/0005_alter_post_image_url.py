# Generated by Django 4.1.2 on 2022-11-27 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0004_alter_post_host'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image_url',
            field=models.CharField(blank=True, default='', max_length=3000, null=True),
        ),
    ]