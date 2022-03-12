from unicodedata import category, name
from django.db import models

class Ingredient(models.Model):
  name = models.CharField("Ingredient Name", max_length=400, blank=False)
  kind = models.CharField("Kind", max_length=100, blank=False)
  price = models.PositiveIntegerField("Price", blank=True, null=True)

  def __str__(self):
        return self.name

class Dish(models.Model):
  name = models.CharField("Dish Name", max_length=400)
  picture = models.URLField("Picture URL", blank=True)
  ingredient = models.ManyToManyField(Ingredient)
  category = models.CharField("Category", max_length=100)
  part = models.PositiveIntegerField("Part", default=1)

  def __str__(self):
        return self.name