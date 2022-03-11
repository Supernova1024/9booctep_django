from django.contrib import admin

from django.contrib import admin
from home.models import User, user_activation
from django.contrib.auth import get_user_model
User = get_user_model()


admin.site.register(User)
admin.site.register(user_activation)
