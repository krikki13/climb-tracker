from django.db.models import QuerySet, Count
from rest_framework import serializers

from crags.serializers import CragSerializer
from journal.models import ClimbingDay, ClimbedRoute


class ClimbingDaySerializer(serializers.ModelSerializer):
    crag = CragSerializer
    numOfClimbedRoutes = serializers.IntegerField()

    class Meta:
        model = ClimbingDay
        fields = ('id', 'date', 'crag', 'belayer', 'comment', 'numOfClimbedRoutes')

    def __new__(cls, *args, **kwargs):
        if args and isinstance(args[0], QuerySet):
            queryset = cls._build_queryset(args[0])
            args = (queryset,) + args[1:]
        return super().__new__(cls, *args, **kwargs)

    @classmethod
    def _build_queryset(cls, queryset):
        # modify the queryset here
        return queryset.annotate(
            numOfClimbedRoutes=Count('routes')
        )


class ClimbedRouteSerializer(serializers.ModelSerializer):
    routeId = serializers.IntegerField(source='route_id')
    ascentType = serializers.CharField(source='ascent_type.name')
    suggestedGrade = serializers.CharField(source='suggested_grade')
    topRope = serializers.BooleanField(source='is_top_rope')

    class Meta:
        model = ClimbedRoute
        fields = ('id', 'routeId', 'ascentType', 'topRope', 'belayer', 'comment', 'suggestedGrade')


class ClimbingDayWithRoutesSerializer(serializers.ModelSerializer):
    crag = CragSerializer
    routes = ClimbedRouteSerializer(many=True)

    class Meta:
        model = ClimbingDay
        fields = ('id', 'date', 'crag', 'belayer', 'comment', 'routes')