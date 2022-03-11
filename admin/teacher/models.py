from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from home.models import *


# Create your models here.

class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Subcategories(models.Model):
    categories = models.ForeignKey(Categories, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=200)
    image = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Courses(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    requirements = models.TextField(null=True, blank=True)
    gains = models.TextField(null=True, blank=True)
    scat = models.ForeignKey(Categories, on_delete=models.CASCADE)
    subcat = models.ForeignKey(Subcategories, on_delete=models.CASCADE)
    spam = models.IntegerField(null=True, blank=True)
    price = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey('home.User', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    type = models.IntegerField(default=0, null=True)
    students_admitted = models.IntegerField(default=0)
    students_passed = models.IntegerField(default=0)
    header_img = models.CharField(max_length=255)
    cover_img = models.CharField(max_length=255)
    course_url = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=True)
    course_level = models.IntegerField(validators=[MaxValueValidator(3)])
    dripping = models.IntegerField(validators=[MaxValueValidator(3)])
    pending = models.IntegerField(validators=[MaxValueValidator(3)])
    approval_status = models.IntegerField(validators=[MaxValueValidator(3)])


class TestVideo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey('home.User', on_delete=models.CASCADE)
    review = models.IntegerField(max_length=11, default=0)

class Sections(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    type = models.CharField(max_length=200, default='1')
    nos = models.CharField(null=True, max_length=11)

class VideoUploads(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    section = models.ForeignKey(Sections, on_delete=models.CASCADE)
    url = models.CharField(max_length=200)
    promo = models.IntegerField(validators=[MaxValueValidator(3)],default=0)
    duration = models.IntegerField(validators=[MaxValueValidator(10)],default=0)
