# Generated by Django 4.1.2 on 2022-11-27 23:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Comment', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
