from datetime import datetime

from django.http import HttpResponse

from copycraginfo import fetchdata
from crags.models import Crag, Sector, Route

def index(request, pk):
    owner_obj = Crag.objects.get(pk=pk)
    return HttpResponse("Hello, world. You're at " + owner_obj.name)

def update_crags(request):
    crags = fetchdata.get_list_of_crags()
    now = datetime.now()

    existing = {}
    for existing_crag in Crag.objects.all():
        existing[existing_crag.name] = existing_crag

    for name, url in crags:
        if name in existing:
            existing_crag = existing[name]
            existing_crag.url = url
            existing_crag.last_updated = now
            existing_crag.save()
        else:
            Crag.objects.create(name=name, last_updated=now, url=url, id_country=3)

    return HttpResponse("Hello, world. " + "<br />".join([row[0] for row in crags]))


def update_crags_and_routes(request):
    crags = fetchdata.get_crags_and_their_routes()
    now = datetime.now()

    text_log = []

    existing = {}
    for existing_crag in Crag.objects.all():
        existing[existing_crag.name] = existing_crag

    for name, url, sectors in crags:
        if name in existing:
            existing_crag = existing[name]
            existing_crag.url = url
            existing_crag.last_updated = now
            existing_crag.save()
        else:
            existing_crag = Crag.objects.create(name=name, last_updated=now, url=url)

        text_log.append(existing_crag.name + " - sectors: " + str(len(sectors)) + " - routes: ")

        existing_sectors = Sector.objects.filter(id_of_crag=existing_crag)
        for sector, routes in sectors:
            existing_sector = [s for s in existing_sectors if s.name == sector]
            if len(existing_sector) == 0:
                existing_sector = Sector.objects.create(name=sector, id_of_crag=existing_crag)
            else:
                existing_sector = existing_sector[0]

            existing_routes = [r for r in Route.objects.filter(id_of_sector=existing_sector)]

            i = 1
            for route in routes:
                matching_existing_route = [r for r in existing_routes if r.name == route[0]]
                if len(matching_existing_route) == 0:
                    Route.objects.create(name=route[0], grade=route[1], length=route[2], id_of_sector=existing_sector,
                                         consecutive_num=i)
                else:
                    matching_existing_route[0].grade = route[1]
                    matching_existing_route[0].length = route[2]
                    matching_existing_route[0].consecutive_num = i
                    matching_existing_route[0].save()
                    existing_routes.remove(matching_existing_route[0])
                i += 1

            text_log[-1] += str(len(routes))

            if len(existing_routes) > 0:
                text_log[-1] += " (" + str(len(existing_routes)) + " too many!)"
            for route in existing_routes:
                route.consecutive_num = None
                route.save()
            text_log[-1] += ", "

    return HttpResponse("UPDATE CRAGS AND ROUTES <br />" + "<br />".join(text_log))