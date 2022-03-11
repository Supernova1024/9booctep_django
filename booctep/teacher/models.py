from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class subcategories(models.Model):
    categories = models.ForeignKey(categories, on_delete=models.DO_NOTHING)
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
    scat_id = models.IntegerField(null=True, blank=True)
    price = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    user_id = models.IntegerField(null=True, blank=True, default=0)
    user_name = models.CharField(max_length=255)
    type = models.IntegerField(default=0, null=True)
    students_admitted = models.IntegerField(default=0)
    students_passed = models.IntegerField(default=0)
    header_img = models.CharField(max_length=255)
    cover_img = models.CharField(max_length=255)
    course_url = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=True) 
    course_level = models.IntegerField(validators=[MaxValueValidator(3)], default=1)
    dripping = models.IntegerField(validators=[MaxValueValidator(3)])
    pending = models.IntegerField(validators=[MaxValueValidator(3)])
    approval_status = models.IntegerField(validators=[MaxValueValidator(3)])

class VideoUploads(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    section_id = models.IntegerField(null=True, blank=True)
    url = models.CharField(max_length=200)
    promo = models.IntegerField(validators=[MaxValueValidator(3)],default=0)
    duration = models.IntegerField(validators=[MaxValueValidator(10)],default=0)
    lock = models.IntegerField(validators=[MaxValueValidator(2)],default=1)

class TestVideo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    user_id = models.IntegerField(max_length=11)
    review = models.IntegerField(max_length=11)

class Sections(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    course_id = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=200, default='1')
    nos = models.CharField(null=True,max_length=11)

class todo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

class questions1(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=1024)
    type = models.CharField(max_length=200)
    section_id = models.IntegerField(null=True, blank=True)
    aw_1_type = models.CharField(max_length=200)
    aw_1_result = models.CharField(max_length=200)
    aw_1_data = models.TextField(null=True, blank=True)
    aw_2_type = models.CharField(max_length=200)
    aw_2_result = models.CharField(max_length=200)
    aw_2_data = models.TextField(null=True, blank=True)
    aw_3_type = models.CharField(max_length=200)
    aw_3_result = models.CharField(max_length=200)
    aw_3_data = models.TextField(null=True, blank=True)
    aw_4_type = models.CharField(max_length=200)
    aw_4_result = models.CharField(max_length=200)
    aw_4_data = models.TextField(null=True, blank=True)

class questions(models.Model):
    id = models.AutoField(primary_key=True)
    section_id = models.IntegerField(null=True)
    title = models.TextField(null=True)
    content = models.TextField(null=True)
    answer = models.CharField(max_length=255)
    nos = models.IntegerField(null=True)

class answers(models.Model):
    id = models.AutoField(primary_key=True)
    # course = models.IntegerField(null=True,max_length=11)
    course = models.ForeignKey(Courses,on_delete=models.CASCADE)
    question = models.ForeignKey(questions,on_delete=models.CASCADE)
    # question = models.IntegerField(null=True,max_length=11)
    answer = models.TextField(max_length=255)
    # result = models.IntegerField(max_length=3,default=1)
    result = models.IntegerField(validators=[MaxValueValidator(3)],default=1)
    # pending = models.IntegerField(null=True, max_length=3)
    pending = models.IntegerField(null=True,validators=[MaxValueValidator(3)])
    student_id = models.IntegerField(null=True)


class student_mark(models.Model):
    id = models.AutoField(primary_key=True)
    course_id = models.IntegerField(null=True)
    student_id = models.IntegerField(null=True)
    mark = models.FloatField(default=0.00)

class transactions(models.Model):
    id = models.AutoField(primary_key=True)
    fees = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    revenue = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    course_id = models.IntegerField(null=True, blank=True, default=0)




