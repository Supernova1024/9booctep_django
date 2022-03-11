from django.contrib import admin

from django.contrib import admin
from teacher.models import categories, subcategories, todo
from django.contrib.auth import get_user_model
User = get_user_model()


class categoriesList(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'created_at')

# class subcategoriesList(admin.ModelAdmin):
    # list_display = ('user_categories', 'name', 'image', 'created_at')
# class todoList(admin.ModelAdmin):
#     list_todo = ('id', 'name')
# admin.site.register(categories, categoriesList)
# admin.site.register(subcategories, subcategoriesList)
# admin.site.register(todo, todo)