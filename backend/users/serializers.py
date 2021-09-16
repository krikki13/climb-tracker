import re
from datetime import datetime

from django.contrib.auth.password_validation import CommonPasswordValidator
from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    yearOfBirth = serializers.IntegerField(source='year_of_birth')

    def validate_gender(self, value):
        if value == "None":
            value = None
        if value is not None and value != 'M' and value != 'F':
            raise serializers.ValidationError('Invalid gender')
        return value

    def validate_yearOfBirth(self, value):
        now = datetime.now()
        if value > now.year or value < now.year - 100:
            raise serializers.ValidationError('Invalid year of birth')
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password should be 8 characters long')
        if not re.search("[a-z]", value) or not re.search("[A-Z]", value):
            raise serializers.ValidationError('Password should contain both upper and lower case letters')
        if not re.search("\d", value):
            raise serializers.ValidationError('Password should contain at least one digit')
        if not re.search("[!#$%&/()=?*'+,\\-;:_<>]", value):
            raise serializers.ValidationError('Password should contain at least one character')
        if re.search("\s", value):
            raise serializers.ValidationError('Password should not contain any spaces')

        CommonPasswordValidator().validate(value)

        res = re.findall("([^a-zA-Z0-9!#$%&/()=?*'+,\\-;:_<>])", value)
        if res is not None:
            raise serializers.ValidationError('Password should not contain: ' + "".join(res))
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
        extra_kwargs = {
            'password': {'write_only': True}
        }
