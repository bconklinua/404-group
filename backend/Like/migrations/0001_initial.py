# Generated by Django 4.1.2 on 2022-12-08 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='like', editable=False, max_length=4)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
