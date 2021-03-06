from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from rest_framework import parsers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


@api_view(['POST'])
def create_new_user(request):
    data = parsers.JSONParser().parse(request)

    user_serializer = UserSerializer(data=data)
    if user_serializer.is_valid():
        User.objects.create_user(user_serializer.validated_data)
        return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)

    if user is not None:
        login(request, user)
        return Response({'csrftoken': get_token(request)}, status=status.HTTP_200_OK)
    else:
        return Response("Nope", status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@csrf_exempt
def logout_user(request):
    logout(request)
    return Response("Done", status=status.HTTP_200_OK)


@api_view(['GET'])
def whoami(request):
    if request.user.is_anonymous:
        return Response("No one", status=status.HTTP_200_OK)
    return Response(UserSerializer(request.user).data,
                    status=status.HTTP_200_OK)