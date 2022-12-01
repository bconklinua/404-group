# Generated by Django 4.1.2 on 2022-12-01 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FriendRequest', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendrequest',
            name='network',
            field=models.CharField(choices=[('local', 'A True TrueFriends To TrueFriends Friend Request'), ('truefriends_to_team13', 'Friend Request From TrueFriends to the Team 13 Network'), ('team13_to_truefriends', 'Friend Request From the Team 13 Network to TrueFriends'), ('truefriends_to_team19', 'Friend Request From TrueFriends to the Team 19 Network'), ('team19_to_truefriends', 'Friend Request From the Team 19 Network to TrueFriends'), ('truefriends_to_team10', 'Friend Request From TrueFriends to the Team 10 Network'), ('team10_to_truefriends', 'Friend Request From the Team 10 Network to TrueFriends')], default='local', max_length=64),
        ),
    ]
