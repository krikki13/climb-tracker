from datetime import datetime

from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    # FIXME error_messages attribute does not seem to work
    email = models.EmailField(unique=True, max_length=127, error_messages={"invalid": "Invalid email address"})
    year_of_birth = models.IntegerField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=128)
    last_login = models.TimeField(blank=True, null=True)
    created_on = models.TimeField(default=datetime.now, editable=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'year_of_birth', 'gender', 'created_on']

    class Meta:
        managed = False
        db_table = 'User'