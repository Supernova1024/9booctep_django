from django.db import models
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from teacher.models import subcategories,Courses
from home.models import User
import os, shutil
import datetime
from django.core.validators import MinValueValidator, MaxValueValidator


class student_register_courses(models.Model):
	student_id = models.ForeignKey(User, on_delete=models.CASCADE,null = True,related_name='id_user')
	course_id = models.ForeignKey(Courses, on_delete=models.CASCADE,null = True,related_name='id_course')
	last_completed_section_id = models.IntegerField(default=0)
	date_created = models.CharField(max_length=255)
	withdraw = models.IntegerField(max_length=3, default=0, null=True)
	approve_date = models.CharField(max_length=255)

class student_cart_courses(models.Model):
	student_id = models.ForeignKey(User, on_delete=models.CASCADE,null = True,related_name='user_cart')
	course_id = models.ForeignKey(Courses, on_delete=models.CASCADE,null = True,related_name='id_course_for_cart')
	
class student_favourite_courses(models.Model):
	student_id = models.ForeignKey(User, on_delete=models.CASCADE,null = True,related_name='user_favourite')
	course_id = models.ForeignKey(Courses, on_delete=models.CASCADE,null = True,related_name='id_course_for_favorite')	
	
class course_comments(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True, related_name='student_name')
	course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
	comment = models.TextField(null=True, blank=True)
	rating = models.FloatField(null=True)
	reply = models.TextField(null=True, blank=True)
	date = models.DateTimeField(auto_now=True)
	date_updated = models.DateTimeField(auto_now=True)
	approved_by_teacher = models.BooleanField(default=False)

class student_performance(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE,null = True)
	course_id = models.IntegerField(null=True, blank=True)
	total_cnt = models.IntegerField(null=True, blank=True)
	answer_cnt = models.IntegerField(null=True, blank=True)

	rate = models.FloatField(null=True)


class student_certificate(models.Model):
	student_id = models.IntegerField(null=True)
	course_id = models.IntegerField(null=True)
	url = models.CharField(max_length=255)
	no = models.CharField(max_length=255)

	

class payment(models.Model):
	student = models.ForeignKey(User, on_delete=models.CASCADE)
	card_no = models.CharField(null=True, max_length=255)
	cvv = models.CharField(null=True, max_length=255)
	# month = models.IntegerField(null=True, max_length=11)
	month = models.IntegerField(null=True,validators=[MaxValueValidator(11)])
	# year = models.IntegerField(null=True, max_length=11)
	year = models.IntegerField(null=True, validators=[MaxValueValidator(11)])
