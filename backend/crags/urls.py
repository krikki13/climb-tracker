from django.urls import path

from . import views

urlpatterns = [
    path('crags/', views.get_all_crags),
    path('crags/<int:crag_id>', views.get_sectors_of_crag),
]