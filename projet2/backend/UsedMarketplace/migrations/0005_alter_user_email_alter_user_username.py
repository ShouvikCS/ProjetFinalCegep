# Generated by Django 5.0.2 on 2024-04-14 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UsedMarketplace', '0004_alter_user_email_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
