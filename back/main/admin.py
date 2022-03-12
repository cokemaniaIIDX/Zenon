from django.contrib import admin
from .models import Ingredient, Dish

class IngredientAdmin(admin.ModelAdmin):
  list_display = ('name', 'kind', 'price')
  list_display_link = ('name')

class DishAdmin(admin.ModelAdmin):
  list_display = ('name', 'category')

admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Dish, DishAdmin)