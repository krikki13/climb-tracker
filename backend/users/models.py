from datetime import datetime

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class MyUserManager(BaseUserManager):
    def create_user(self, data):
        user = self.model(
            email=self.normalize_email(data['email']),
            first_name=data['first_name'],
            last_name=data['last_name'],
            year_of_birth=data['year_of_birth'],
            gender=data['gender']
        )

        user.set_password(data['password'])
        user.save(using=self._db)
        return user


# Create your models here.
class User(AbstractBaseUser):
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    # FIXME error_messages attribute does not seem to work
    email = models.EmailField(unique=True, max_length=127, error_messages={"invalid": "Invalid email address"})
    year_of_birth = models.IntegerField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    last_login = models.TimeField(blank=True, null=True)
    created_on = models.TimeField(default=datetime.now, editable=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'year_of_birth', 'gender', 'created_on']

    objects = MyUserManager()

    class Meta:
        managed = False
        db_table = 'User'


