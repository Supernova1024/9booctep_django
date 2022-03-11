from django.db import models

# Create your models here.

class Student_register_courses(models.Model):
	student_id = models.ForeignKey('home.User', on_delete=models.CASCADE, null=True, related_name='register user+')
	course_id = models.ForeignKey('teacher.Courses', on_delete=models.CASCADE, null=True, related_name='register course+')
	last_completed_section_id = models.IntegerField(default=0)
	date_created = models.CharField(max_length=255)
	withdraw = models.IntegerField(max_length=3, default=0, null=True)
	approve_date = models.CharField(max_length=255)



class Course_comments(models.Model):
	user = models.ForeignKey('home.User', on_delete=models.CASCADE, null=True, blank=True, related_name='student name+')
	course_id = models.ForeignKey('teacher.Courses', on_delete=models.CASCADE)
	comment = models.TextField(null=True, blank=True)
	rating = models.FloatField(null=True)
	reply = models.TextField(null=True, blank=True)
	date = models.DateTimeField(auto_now=True)
	date_updated = models.DateTimeField(auto_now=True)
	approved_by_teacher = models.BooleanField(default=False)