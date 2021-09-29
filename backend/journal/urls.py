from django.urls import path

from . import views

urlpatterns = [
    path('climbingDays', views.get_climbing_days)
]