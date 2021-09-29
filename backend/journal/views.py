from functools import wraps

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from journal.models import ClimbingDay
from journal.serializers import ClimbingDaySerializer


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
    id = request.user.id
    climbing_days = ClimbingDay.objects.filter(user_id=id)
    serializer = ClimbingDaySerializer(climbing_days, many=True)
    return Response(serializer.data)


