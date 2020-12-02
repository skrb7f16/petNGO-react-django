from django.urls import path
from .views import hello,register,donation,report,getUser

urlpatterns = [
    path('',hello),
    path('register',register),
    path('user/donations',donation),
    path('user/reports',report),
    path('currentUser',getUser),
]
