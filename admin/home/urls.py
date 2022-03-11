from django.conf.urls import include, url, i18n
from home.views import *

urlpatterns = [

    # get request
    url(r'^$', getLogin, name='login'),
    url(r'^forgetPassword/$', forgetPassword, name='forget password'),
    url(r'^send_reset_link/$', sendResetLink, name='send reset link'),
    url(r'^reset_password/$', resetPassword, name='forget password'),
    url(r'^post_reset_password/$', postResetPassword, name='forget password'),
    url(r'^settings/$', profile, name='profile'),
    url(r'^financial/$', financial, name='financial'),
    url(r'^sales/$', sales, name='sales'),
    url(r'^performance/$', performance, name='performance'),
    url(r'^marketing/$', marketing, name='marketing'),
    url(r'^security/$', security, name='security'),
    url(r'^notifications/$', notifications, name='notifications'),
    url(r'^sub_notification/$', subNotifications, name='sub notifications'),
    url(r'^expenses/$', expenses, name='expenses'),
    url(r'^control/$', control, name='control'),
    url(r'^works/$', works, name='works'),
    url(r'^tasks/$', tasks, name='tasks'),
    url(r'^discount/$', discount, name='discount'),
    url(r'^refund/$', refund, name='refund'),
    url(r'^spam/$', spam, name='spam'),
    url(r'^courses/$', courses, name='courses'),
    url(r'^review/$', review, name='review'),
    url(r'^test/$', test, name='test'),
    url(r'^teachers/$', teachers, name='teachers'),
    url(r'^students/$', students, name='students'),
    url(r'^employees/$', employees, name='employees'),
    url(r'^superusers/$', superusers, name='superusers'),
    url(r'^single_superuser/$', single_superuser, name='superusers'),
    url(r'^single_employee/$', single_employee, name='superusers'),
    url(r'^single_teacher/$', single_teacher, name='superusers'),
    url(r'^single_student/$', single_student, name='superusers'),

    #auth part
    url(r'^login/$', postlogin, name='post login'),
    url(r'^signout/$', signout, name='sign out'),

    #settings part
    url(r'^update_profile/$', updateProfile, name='post login'),

    #notificaton part
    # url(r'^save_notification/$', saveNotification, name='save notification'),
    url(r'^delete_notification/$', deleteNotification, name='delete notification'),
    url(r'^get_nav_noti_info/$', getNavNotiInfo, name='get Nav Noti Info'),
    url(r'^save_notification_from_employee/$', saveNotificationFromEmployee, name='save notification from employee'),

    #task part
    url(r'^save_task/$', saveTask, name='save notification from employee'),
    url(r'^complete_task/$', completeTask, name='complete task'),
    url(r'^delete_task/$', deleteTask, name='delete task'),

    #student_part
    url(r'^save_student/$', saveStudent, name='save student'),
    url(r'^delete_student/$', deleteStudent, name='delete student'),

    #teacher_part
    url(r'^save_teacher/$', saveTeacher, name='save teacher'),
    url(r'^delete_teacher/$', deleteTeacher, name='delete teacher'),

    #coruse_part
    url(r'^getSubCategories/$', getSubCategories, name='complete task'),
    url(r'^save_course/$', saveCourse, name='complete task'),
    url(r'^delete_course/$', deleteCourse, name='delete course'),

    #expense part
    url(r'^save_expense/$', saveExpense, name='save expense'),
    url(r'^delete_expense/$', deleteExpense, name='delete expense'),

    #financial part
    url(r'^save_target/$', saveTarget, name='save target'),
    url(r'^get_course_video/$', getCourseVideo, name='get course video by course id'),

    #employee part
    url(r'^add_employee/$', addEmployee, name='add employee'),
    url(r'^edit_member/$', editMember, name='edit employee, super user'),
    url(r'^delete_member/$', deleteMember, name='delete employee, super user'),
    url(r'^add_position/$', addPosition, name='add position'),
    url(r'^add_superuser/$', addSuperUser, name='add super user'),

    #add course complete request comes.. add them to page..
    url(r'^getCourseById/$', getCourseById, name='superusers'),
    url(r'^getTestVideoById/$', getTestVideoById, name='superusers'),
    url(r'^setApprove/$', setApprove, name='superusers'),
    url(r'^setCancel/$', setCancel, name='superusers'),
    url(r'^deleteVideoById/$', deleteVideoById, name='superusers'),

    #control part
    url(r'^priority_change/$', priorityChange, name='superusers'),
    url(r'^save_student_tax/$', saveStudentTax, name='superusers'),
    url(r'^save_teacher_tax/$', saveTeacherTax, name='superusers'),
    url(r'^delete_student_tax/$', deleteStudentTax, name='superusers'),
    url(r'^delete_teacher_tax/$', deleteTeacherTax, name='superusers'),

    #spam & refund part
    url(r'^spam_set_approve/$', spamSetApprove, name='spam set approve'),
    url(r'^refund_set_approve/$', refundSetApprove, name='refund set approve'),
    url(r'^refund_set_cancel/$', refundSetCancel, name='refund set cancel'),


    #payout part
    url(r'^payout/$', payout, name='payout'),
    url(r'^payout_approve/$', payoutApprove, name='payout approve'),
    url(r'^payout_delete/$', payoutDelete, name='payout delete'),

    #discount part
    url(r'^create_discount/$', createDiscount, name='create discount'),
    url(r'^delete_discount/$', deleteDisount, name='delete discount'),
    url(r'^disable_discount_by_course/$', disableDiscount, name='disable discount'),

]
