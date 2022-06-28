from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from django.utils.translation import gettext_lazy as _
from .forms import UserCreationForm, UserChangeForm
from .models import User


class UserAdmin(_UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        # (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ("username", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("username",)

admin.site.register(User, UserAdmin)
