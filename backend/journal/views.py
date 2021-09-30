from functools import wraps

from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from journal.models import ClimbingDay, ClimbedRoute
from journal.serializers import ClimbingDaySerializer, ClimbingDayWithRoutesSerializer


def user_passes_test(test_func):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if test_func(request.user):
                return view_func(request, *args, **kwargs)
            return HttpResponse('Unauthorized', status=401)
        return _wrapped_view
    return decorator


def login_required_401(function=None):
    actual_decorator = user_passes_test(
        lambda u: u.is_authenticated,
    )
    if function:
        return actual_decorator(function)
    return actual_decorator


@api_view(['GET'])
@login_required_401
def get_climbing_days(request):
    climbing_days = ClimbingDay.objects.filter(user_id=request.user.id)
    serializer = ClimbingDaySerializer(climbing_days, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@login_required_401
def get_climbing_day_details(request, day_id):
    try:
        climbing_day = ClimbingDay.objects.get(id=day_id)
        if climbing_day.user_id != request.user.id:
            # lets keep it 404 (not FORBIDDEN) to not leak any information
            return Response("Climbing day not found", status=status.HTTP_404_NOT_FOUND)
        serializer = ClimbingDayWithRoutesSerializer(climbing_day)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response("Climbing day not found", status=status.HTTP_404_NOT_FOUND)
