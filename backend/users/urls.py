from django.urls import path

from . import views

urlpatterns = [
    path('whoami', views.whoami),
    path('logout', views.logout_user),
    path('create', views.create_new_user),
]