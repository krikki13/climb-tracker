from datetime import datetime

from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    yearOfBirth = serializers.IntegerField(source='year_of_birth')

    def validate_gender(self, value):
        if value is not None and value != 'M' and value != 'F':
            raise serializers.ValidationError('Invalid gender')
        return value

    def validate_yearOfBirth(self, value):
        now = datetime.now()
        if value > now.year or value < now.year - 100:
            raise serializers.ValidationError('Invalid year of birth')
        return value

    class Meta:
        model = User
        fields = ('firstName',
                  'lastName',
                  'email',
                  'yearOfBirth',
                  'gender',
                  'password'
                  )
