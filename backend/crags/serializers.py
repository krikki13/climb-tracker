from rest_framework import serializers

from crags.models import Crag, Sector, Route, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'slovenian_name', 'code')


class CragListSerializer(serializers.ModelSerializer):
    numOfRoutes = serializers.CharField(source='num_of_routes')
    lastUpdated = serializers.CharField(source='last_updated')

    class Meta:
        model = Crag
        fields = ('id', 'name', 'numOfRoutes', 'lastUpdated', 'url')


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('name', 'grade', 'length')


class SectorSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True)

    class Meta:
        model = Sector
        fields = ('name', 'routes')


class CragWithRoutesSerializer(serializers.ModelSerializer):
    numOfRoutes = serializers.CharField(source='num_of_routes')
    lastUpdated = serializers.CharField(source='last_updated')
    sectors = SectorSerializer(many=True)

    class Meta:
        model = Crag
        fields = ('name', 'numOfRoutes', 'lastUpdated', 'url', 'sectors')

