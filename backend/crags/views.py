from rest_framework.decorators import api_view
from rest_framework.response import Response

from crags.models import Crag
from crags.serializers import CragListSerializer, CragWithRoutesSerializer


# Create your views here.
@api_view(['GET'])
def get_all_crags(request):
    if request.method == 'GET':
        serializer = CragListSerializer(Crag.objects.all(), many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_sectors_of_crag(request, crag_id):
    if request.method == 'GET':
        serializer = CragWithRoutesSerializer(Crag.objects.get(pk=crag_id))
        return Response(serializer.data)
