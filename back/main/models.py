from django.db import models

class Dish(models.Model):
  dishName = models.CharField(name="Dish Name", max_length=100)
  picture = models.URLField(name="Picture URL")
  