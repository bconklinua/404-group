from django.urls import path
from . import views
from .views import AuthorLikeView

urlpatterns = [
    path('', AuthorLikeView.as_view({'get':'list'})),
    path('<int:pk>/', AuthorLikeView.as_view({'get':'retrieve'})),
]
