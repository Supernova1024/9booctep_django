# from django.urls import path
from django.conf.urls import include, url, i18n
from teacher.views import store_course, store_course_2, store_course_3, getCourseDetailsById
from student.views import *

urlpatterns = [
    # url(r'^store-course/$', store_course, name="store course"),
    # url(r'^store-course-2/$', store_course_2, name="store course2"),
    # url(r'^store-course-3/$', store_course_3, name="store course3"),
    url(r'^get-coursedetails/$', getCourseDetailsById, name="get course details"),
   
    url(r'^video_check/$', video_check, name="video_check"),
    url(r'^savePaymentInfo/$', savePaymentInfo, name='savePaymentInfo'),
    url(r'^save_rating/$', saveRating, name='save rating'),
    url(r'^get_rating/$', getRating, name='get rating'),
    url(r'^save_review_reply/$', saveReviewReply, name='reply from teacher to student for review'),
    url(r'^remove_review_reply/$', removeReviewReply, name='remove reply from teacher to student for review'),
    url(r'^add_to_profile_review/$', addToProfileReview, name='add to teachers profile this review'),
    url(r'^remove_from_profile_review/$', removeFromProfileReview, name='remove from teachers profile this review'),

    url(r'^get_course_rating_by_student/$', getCourseRatingByStudent, name='get course rating by student'),

    
]