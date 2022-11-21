# Generated by Django 4.1.2 on 2022-11-15 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Comment', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='contentType',
            field=models.CharField(choices=[('text/markdown', 'Common Mark'), ('text/plain', 'UTF-8'), ('application/base64', 'Base 64'), ('image/png;base64', 'Base 64 Embedded PNG'), ('image/jpeg;base64', 'Base 64 Embedded JPEG')], default='text/plain', max_length=100),
        ),
    ]