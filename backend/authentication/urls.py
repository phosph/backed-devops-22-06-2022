from django.urls import path
from authentication import views

urlpatterns = [
    path('login', views.login),
    path('signup', views.signup),
    # path('snippets/<int:pk>', views.snippet_detail),
]
