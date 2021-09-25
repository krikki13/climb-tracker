from rest_framework import serializers

from crags.models import Crag, Sector, Route, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'slovenian_name', 'code')


class CragListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crag
        fields = ('id', 'name', 'num_of_routes', 'last_updated', 'url')


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
    sectors = SectorSerializer(many=True)

    class Meta:
        model = Crag
        fields = ('name', 'num_of_routes', 'last_updated', 'url', 'sectors')

