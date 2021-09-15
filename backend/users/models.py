from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    email = models.CharField(unique=True, max_length=127)
    year_of_birth = models.IntegerField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=128)
    last_login = models.TimeField(blank=True, null=True)
    created_on = models.TimeField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'year_of_birth', 'gender', 'created_on']

    class Meta:
        managed = False
        db_table = 'User'