from django.http import JsonResponse
from rest_framework import parsers
# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view

from users.serializers import UserSerializer


@api_view(['POST'])
def create_new_user(request):
    data = parsers.JSONParser().parse(request)

    tutorial_serializer = UserSerializer(data=data)
    if tutorial_serializer.is_valid():
        tutorial_serializer.save()
        return JsonResponse(tutorial_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
