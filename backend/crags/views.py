from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from crags.models import Crag, Country
from crags.serializers import CragListSerializer, CragWithRoutesSerializer, CountrySerializer


@api_view(['GET'])
def get_all_countries(request):
    if request.method == 'GET':
        serializer = CountrySerializer(Country.objects.all(), many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_all_crags(request, country_code):
    if request.method == 'GET':
        try:
            country = Country.objects.get(code=country_code)
            serializer = CragListSerializer(Crag.objects.filter(id_country=country.id), many=True)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response("Country code does not exist", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_sectors_of_crag(request, crag_id):
    if request.method == 'GET':
        serializer = CragWithRoutesSerializer(Crag.objects.get(pk=crag_id))
        return Response(serializer.data)


@api_view(['GET'])
def update_number_of_routes(request):
    if request.method == 'GET':
        crags = Crag.objects.all()
        for crag in crags:
            count = 0
            crag_ser = CragWithRoutesSerializer(crag)
            for sector in crag_ser.data['sectors']:
                count += len(sector['routes'])
            crag.num_of_routes = count
            crag.save()
        return Response("Updated counts for {} crags".format(len(crags)), status=status.HTTP_200_OK)