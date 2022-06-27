from django.contrib.auth.forms import UserCreationForm as _UserCreationForm
from django.contrib.auth.forms import UserChangeForm as _UserChangeForm

from .models import User


class UserCreationForm(_UserCreationForm):

    class Meta:
        model = User
        fields = ('username',)


class UserChangeForm(_UserChangeForm):

    class Meta:
        model = User
        fields = ('username',)
