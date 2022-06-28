"""Models Module"""

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """
    User model Manager
    """

    def _create_user(
            self,
            username: str,
            password: str,
            email_list: list[str] = None,
            **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError("The given username must be set")

        username = AbstractBaseUser.normalize_username(username)
        user = self.model(username=username, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        if email_list is not None:
            for email in email_list:
                em = Email(email=email, user=user)
                em.save()

        return user

    def create_user(self, username: str, password: str, email_list: list[str] = None, ** extra_fields):
        """
        Create and save an User
        """
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault('is_active', True)
        return self._create_user(username, password, email_list, **extra_fields)

    def create_superuser(self, username: str, password: str, email_list: list[str] = None, ** extra_fields):
        """
        Create and save a SuperUser
        """
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, email_list, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    User model
    """
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
        # validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        ordering = ['date_joined']


class Email(models.Model):
    """
    Email Model
    """
    main = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="email_list"
    )

    class Meta:
        ordering = ['email']
