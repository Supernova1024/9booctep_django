# from django.urls import path
from django.contrib import admin
from django.conf.urls import include, url, i18n
# from home.views import saveimg, getsubcategory, changepassword, update_user, register_user, ajaxlogin, check_email, getPromoData, deleteAccount
from home.views import *
from video.views import *
from teacher.views import *


#POSTS
urlpatterns = [
    url(r'^login/$', ajaxlogin, name='login'),
    url(r'^register-user', register_user, name='register'),
    url(r'^update-user', update_user, name='update'),       
    url(r'^check-email', check_email, name='check email'),    
    url(r'^saveimg/$', saveimg, name='saveimg'),
    url(r'^getsubcategory$', getsubcategory, name='getsubcategory'),
    url(r'^changepassword/$', changepassword, name='changepassword'),
    url(r'^search_course/$', search_course, name='search_course'),
    url(r'^search_course2/$', search_course2, name='search_course2'),
	url(r'^student_courses/$', student_courses, name='student_courses'),
    
	url(r'^student_Cart_courses/$', student_Cart_courses, name='student_Cart_courses'),
    url(r'^delete_Cart_course_single/$', delete_Cart_course_single, name='delete_Cart_course_single'),
    url(r'^delete_Cart_courses_all/$', delete_Cart_courses_all, name='delete Cart courses all'),

	url(r'^student_favourite_courses/$', student_Favourite_courses, name='student_favourite_courses'),
    url(r'^delete_favourite_course_single/$', delete_Favourite_course_single, name='delete_Favourite_course_single'),
    url(r'^delete_favourite_courses_all/$', delete_Favourite_courses_all, name='delete Favourite courses all'),

	url(r'^sort_by_category/$', sort_by_category, name='sort_by_category'),
	url(r'^add_comment/$', add_comment, name='add_comment'),
	url(r'^delete_comment/$', delete_comment, name='add_comment'),
    url(r'^student-performance/$', student_performance, name='teacher student-performance'),

    #add mesingle_category
    url(r'^getPromoData/$', getPromoData, name='get promo data'),
    url(r'^get_course_detail_by_id/$', getCourseDetailForPromo, name='get course detail for promo'),
    url(r'^deleteAccount/$', deleteAccount, name='delete account'),
    url(r'^deleteCourse/$', deleteCourse, name='delete a course'),

    url(r'^saveQuizAnswer/$', saveQuizAnswer, name='delete a course'),
    url(r'^saveQuizMark/$', saveQuizMark, name='get mark to a student'),

    url(r'^getCertificate/$', getCertificate, name='get certificate'),

    url(r'^viewProfile/(?P<id>[0-9]+)/$', viewProfile, name='view profile'),
    url(r'^teacherProfile/$', teacherProfile, name='show teacher profile '),
    url(r'^becomeTeacher/$', becomeTeacher, name='show teacher profile '),

    # VIDEOS
    url(r'^video/playground/(?P<id>[0-9]+)/$', playground, name='video playground'),
    url(r'^video/playground/(?P<id>[0-9]+)/addtoprogress/$', addtoprogress, name='video addtoprogress'),


    url(r'^video/quiz2/$', video_quiz2, name='teacher quiz2'),
    # url(r'^video/quiz2/(?P<id>[0-9]+)/$', video_quiz2, name='teacher quiz2'),
    url(r'^video/quiz3/(?P<id>[0-9]+)/$', video_quiz3, name='teacher quiz3'),

    url(r'^save_become_teacher/$', save_become_teacher, name='save become teacher'),

    # messages part
    url(r'^get_message_history/$', getMessageHistory, name='get message history'),
    url(r'^delete_message_history/$', deleteMessageHistory, name='delete message history'),
    url(r'^set_message_read/$', setMessageRead, name='set message read'),
    url(r'^get_user_by_id/$', getUserById, name='get user by id'),

    #notification part
    url(r'^delete_notification_by_id/$', deleteNotificationById, name='delete notification by id'),
    url(r'^delete_notification/$', deleteNotification, name='delete notification'),
    url(r'^edit_notification/$', editNotification, name='edit notification'),

    #spam & refund part
    url(r'^report_spam/$', reportSpam, name='report spam'),
    url(r'^refund/$', refund, name='refund'),

    url(r'^search_course_name/$', searchCourseName, name='search course name'),

    #payment card info store
    url(r'^save_card_info/$', saveCardInfo, name='save card info'),

    #set privacy for teacher
    url(r'^set_privacy/$', setPrivacy, name='set privacy'),

    # delete course by id
    url(r'^delete_course_by_id/$', deleteCourseById, name='delete course by id'),


    #payment (hold => transfer)
    url(r'^send_transfer_request/$', sendTransferRequest, name='send transfer request'),
    url(r'^check_payout_status/$', checkPayoutStatus, name='check payout status'),



]