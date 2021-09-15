from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.index, name='index'),
    path('update-crags', views.update_crags),
    path('update-crags-and-routes', views.update_crags_and_routes)
]