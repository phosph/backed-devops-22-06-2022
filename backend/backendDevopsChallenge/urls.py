"""backendDevopsChallenge URL Configuration"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'user/', include('user.urls')),
    path(r'auth/', include('authentication.urls')),
]
