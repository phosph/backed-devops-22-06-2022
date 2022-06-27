from knox import urls as knoxUrls
from django.urls import path
from authentication import views

urlpatterns = knoxUrls.urlpatterns + [
    path(r'signup/', views.signup),
]
