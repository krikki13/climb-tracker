from django.urls import path

from . import views

urlpatterns = [
    path('climbingDays', views.get_climbing_days),
    path('climbingDays/<int:day_id>', views.get_climbing_day_details)
]