from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import parsers

from users.serializers import UserSerializer


#class JSONParser(parsers.JSONParser):
#    def parse(self, *args, **kwargs):
#        obj = super(JSONParser, self).parse(*args, **kwargs)
#        return obj


@api_view(['POST'])
def create_new_user(request):
    data = parsers.JSONParser().parse(request)

    tutorial_serializer = UserSerializer(data=data)
    if tutorial_serializer.is_valid():
        # tutorial_serializer.save()
        return status.HTTP_201_CREATED
    return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
