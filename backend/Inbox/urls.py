from django.urls import path
from . import views

urlpatterns = [
    path('', views.InboxView.as_view({'get': 'list'}), name="inbox")
]
