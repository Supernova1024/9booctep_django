from django.db import models

# Create your models here.

class Cache(models.Model):
    key = models.CharField(max_length=30, null=True)
    cache_str = models.TextField()