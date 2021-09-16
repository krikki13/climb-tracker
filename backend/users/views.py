from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework import parsers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


@api_view(['POST'])
def create_new_user(request):
    data = parsers.JSONParser().parse(request)

    tutorial_serializer = UserSerializer(data=data)
    if tutorial_serializer.is_valid():
        User.objects.create_user(tutorial_serializer.validated_data)
        return JsonResponse(tutorial_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)

    if user is not None:
        login(request, user)
        return Response("It worked", status=status.HTTP_200_OK)
    else:
        return Response("Nope", status=status.HTTP_401_UNAUTHORIZED)

    # TODO problem: AssertionError: The `request` argument must be an instance of `django.http.HttpRequest`, not `rest_framework.request.Request`.
    # when request is passed to login


@api_view(['GET'])
def whoami(request):
    if request.user.is_anonymous:
        return Response("No one", status=status.HTTP_200_OK)
    return Response(UserSerializer(request.user).data,
                    status=status.HTTP_200_OK)

# TODO try something?.state in JS