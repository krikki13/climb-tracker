# Generated by Django 3.2.7 on 2021-09-15 17:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('first_name', models.CharField(max_length=127)),
                ('last_name', models.CharField(max_length=127)),
                ('email', models.EmailField(error_messages={'invalid': 'Invalid email address'}, max_length=127, unique=True)),
                ('year_of_birth', models.IntegerField(blank=True, null=True)),
                ('gender', models.TextField(blank=True, null=True)),
                ('last_login', models.TimeField(blank=True, null=True)),
                ('created_on', models.TimeField(default=datetime.datetime.now, editable=False)),
            ],
            options={
                'db_table': 'User',
                'managed': False,
            },
        ),
    ]
