from django.urls import path

from . import views

urlpatterns = [
    path('countries', views.get_all_countries),
    path('crags/<str:country_code>', views.get_all_crags),
    path('crags/<int:crag_id>/routes', views.get_sectors_of_crag),
]