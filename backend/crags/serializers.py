from rest_framework import serializers

from crags.models import Crag, Sector, Route


class CragListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crag
        fields = ('id', 'name', 'last_updated', 'url')
        order_by = 'name'


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('name', 'grade', 'length')
        order_by = 'consecutive_num'


class SectorSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True)

    class Meta:
        model = Sector
        fields = ('name', 'routes')


class CragWithRoutesSerializer(serializers.ModelSerializer):
    sectors = SectorSerializer(many=True)

    class Meta:
        model = Crag
        fields = ('name', 'last_updated', 'url', 'sectors')

