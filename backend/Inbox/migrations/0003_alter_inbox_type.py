# Generated by Django 4.1.2 on 2022-11-21 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inbox', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inbox',
            name='type',
            field=models.CharField(default='inbox', editable=False, max_length=8),
        ),
    ]
