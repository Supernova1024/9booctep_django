from django.db import models
from teacher.models import Courses
from django.core.validators import MinValueValidator, MaxValueValidator
# from home.models import *

class discount(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True)
    promo_code = models.CharField(max_length=255, default='')
    discount_percent = models.IntegerField(default=0)
    expire = models.CharField(max_length=255, default='')
    days = models.IntegerField(max_length=11, default=0)





