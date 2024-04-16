from django.urls import path
from accounts.views import TestAPI,RegisterView,LoginView,logoutView,AllAccounts

urlpatterns = [
    
    path('test/',TestAPI),
    path('',AllAccounts),
    path('register/',RegisterView),
    path('login/',LoginView),
    path('logout/',logoutView),

]