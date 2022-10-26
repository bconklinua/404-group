from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('test/', views.TestIfLoggedIn.as_view(), name="test_login"),
]
