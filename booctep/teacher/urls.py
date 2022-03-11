# from django.urls import path
from django.conf.urls import include, url, i18n
from teacher.views import *


urlpatterns = [
    url(r'^teacher/add_course/$', add_course, name='teacher new-course'),
    url(r'^teacher/test_video/$', test_video, name='teacher new-course'),
    url(r'^teacher/save_testvideo/$', save_testvideo, name='teacher new-course'),



    url(r'^store_course/$', store_course, name="store course"),
    url(r'^store_course_2/$', store_course_2, name="store course2"),
    url(r'^store-course_3/$', store_course_3, name="store course3"),
    url(r'^store-course_4/$', store_course_4, name="store course4"),
    url(r'^save_later/$', save_later, name="store course"),
    url(r'^save_later_2/$', save_later_2, name="store course"),

]
