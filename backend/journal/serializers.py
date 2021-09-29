from rest_framework import serializers

from crags.serializers import CragSerializer
from journal.models import ClimbingDay, ClimbedRoute


class ClimbingDaySerializer(serializers.ModelSerializer):
    crag = CragSerializer

    class Meta:
        model = ClimbingDay
        fields = ('date', 'crag', 'belayer', 'comment')


class ClimbedRouteSerializer(serializers.ModelSerializer):
    routeId = serializers.IntegerField(source='route_id')
    ascentType = serializers.CharField(source='ascent_type')
    suggestedGrade = serializers.CharField(source='suggested_grade')
    topRope = serializers.BooleanField(source='is_top_rope')

    class Meta:
        model = ClimbedRoute
        fields = ('routeId', 'ascentType', 'topRope', 'belayer', 'comment', 'suggestedGrade')
