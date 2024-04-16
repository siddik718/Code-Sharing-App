from django.urls import path
from .views import TestAPI,SnippetView,SnippetDetailView

urlpatterns = [
    path('test/',TestAPI),
    path('',SnippetView),
    path('<str:str>/',SnippetDetailView)
]