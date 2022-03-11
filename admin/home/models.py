from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from student.models import *
from teacher.models import *

# Create your models here.

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

class User(models.Model):
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    last_login = models.DateTimeField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    receive_notifications = models.BooleanField(default=True)
    date_joined = models.DateTimeField(null=True, blank=True)
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField( max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    group_id = models.IntegerField(null=True, max_length=3)
    receive_email = models.IntegerField(default=0)

class Position(models.Model):
    name = models.CharField(max_length=255)
    comment = models.CharField(max_length=255)


class Admin(AbstractBaseUser):
    email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=255)
    role = models.IntegerField(default=1)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(null=True, blank=True)
    address = models.CharField(max_length=255)
    position = models.ForeignKey(Position, max_length=3, on_delete=models.CASCADE)
    USERNAME_FIELD = "email"

    objects = UserManager()

    class Meta():
        verbose_name = _("Admin")
        verbose_name_plural = _("Admins")

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

class Adminnotifications(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(null=True, blank=True)
    sender = models.ForeignKey(Admin, on_delete=models.CASCADE, related_name='sender id+')
    receiver = models.ForeignKey(Admin, on_delete=models.CASCADE, related_name='receiver id+')
    time = models.DateTimeField()
    is_read = models.IntegerField(max_length=3, default=0)
    good_bad = models.IntegerField(max_length=3)

class Logtime(models.Model):
    user = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True)
    in_time = models.CharField(max_length=255)
    out_time = models.CharField(max_length=255)

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    start_date = models.CharField(max_length=255)
    end_date = models.CharField(max_length=255)
    done_date = models.CharField(max_length=255)
    priority = models.IntegerField(max_length=3, null=True)
    sender = models.ForeignKey(Admin,on_delete=models.CASCADE, related_name='sender id+')
    receiver = models.ForeignKey(Admin, on_delete=models.CASCADE, related_name='receiver id+')
    file_url = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)

class Expense(models.Model):
    name = models.CharField(max_length=255)
    buyer = models.CharField(max_length=255)
    price = models.FloatField(null=True, default=0)
    description = models.CharField(max_length=255)
    date_created = models.DateTimeField()

class Admintarget(models.Model):
    sale_target = models.IntegerField(max_length=11, null=True)
    course_target = models.IntegerField(max_length=11, null=True)
    user_target = models.IntegerField(max_length=11, null=True)

class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Admincontrol(models.Model):
    priority = models.IntegerField(max_length=11)
    student_tax = models.IntegerField(max_length=11)
    teacher_tax = models.IntegerField(max_length=11)

class Spam(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="spam_teacher")
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="spam_student")
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True, related_name="spam_course")
    title = models.CharField(max_length=255)
    content = models.TextField()
    approval_status = models.IntegerField(max_length=3, default=1)
    date_created = models.CharField(max_length=255)

class Refund(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="refund_teacher")
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="refund_student")
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, null=True, related_name="refund_course")
    title = models.CharField(max_length=255)
    content = models.TextField()
    approval_status = models.IntegerField(max_length=3, default=1)
    date_created = models.CharField(max_length=255)

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
