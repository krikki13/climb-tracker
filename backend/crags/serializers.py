from rest_framework import serializers

from crags.models import Crag, Sector, Route, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'slovenian_name', 'code')


class CragSerializer(serializers.ModelSerializer):
    numOfRoutes = serializers.CharField(source='num_of_routes')
    lastUpdated = serializers.CharField(source='last_updated')

    class Meta:
        model = Crag
        fields = ('id', 'name', 'numOfRoutes', 'lastUpdated', 'url')


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('id', 'name', 'grade', 'length')


class SectorSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True)

    class Meta:
        model = Sector
        fields = ('id', 'name', 'routes')


class CragWithRoutesSerializer(serializers.ModelSerializer):
    numOfRoutes = serializers.CharField(source='num_of_routes')
    lastUpdated = serializers.CharField(source='last_updated')
    sectors = SectorSerializer(many=True)

    class Meta:
        model = Crag
        fields = ('id', 'name', 'numOfRoutes', 'lastUpdated', 'url', 'sectors')

