# Generated by Django 4.1.2 on 2022-11-25 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('network', models.CharField(choices=[('local', 'A True TrueFriends To TrueFriends Friend Request'), ('truefriends_to_team13', 'Friend Request From TrueFriends to the Team 13 Network'), ('team13_to_truefriends', 'Friend Request From the Team 13 Network to TrueFriends'), ('truefriends_to_team19', 'Friend Request From TrueFriends to the Team 19 Network'), ('team19_to_truefriends', 'Friend Request From the Team 19 Network to TrueFriends')], default='local', max_length=64)),
            ],
        ),
    ]
