from django.core import serializers
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from home.models import *
from student.models import *
from django.conf import settings
from teacher.models import *
from video.models import *
from django.db.models import Q
import uuid
import datetime
from django.contrib.auth.decorators import login_required
from operator import attrgetter

# auth part import
from django.contrib.auth import authenticate, login, logout
import json

# Create your views here.
def getLogin(request):
    return render(request, 'auth/login.html')


def forgetPassword(request):
    return render(request, 'auth/forget-password.html')

@csrf_exempt
def sendResetLink(request):
    email = request.POST.get('email')
    status = 0
    one = Admin.objects.filter(email=email)
    now = datetime.datetime.now()
    if len(one) > 0:
        user = one[0]
        html = render_to_string('mail/reset-password.html', {'user': user})
        subject = 'Reset Password'
        msg = EmailMultiAlternatives(subject, '', '', [email])
        msg.attach_alternative(html, "text/html")
        msg.send()
        status = 1
        id = user.id
    else :
        status = 0
        id = ''
    ret = {
        'status': status,
        'id': id
    }
    return JsonResponse(ret)

def resetPassword(request):
    id = request.GET.get('id')
    return render(request, 'auth/reset-password.html', {'reset_id': id})

@csrf_exempt
def postResetPassword(request):
    id = request.POST.get('reset_id')
    password = request.POST.get('password')
    status = 1
    try:
        member = Admin.objects.get(pk=id)
        member.set_password(password)
        member.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def profile(request):
    id = request.user.id
    user = Admin.objects.get(pk=id)
    return render(request, 'settings.html', {'user': user})


def financial(request):
    type1 = request.POST.get('type1')
    type2 = request.POST.get('type2')
    type3 = request.POST.get('type3')
    if type1 == '' or type1 == None:
        type1 = 1
    else :
        type1 = int(type1)

    if type2 == '' or type2 == None:
        type2 = 1
    else :
        type2 = int(type2)

    if type3 == '' or type3 == None:
        type3 = 1
    else :
        type3 = int(type3)

    if type1 == 1:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")
        yesterday = datetime.datetime.now() - datetime.timedelta(1)
        yesterday1 = datetime.datetime.strftime(yesterday, "%Y-%m-%d 00:00:00")
        yesterday2 = datetime.datetime.strftime(yesterday, "%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list('course_id_id', flat=True)
        revenue = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue += course.price
        list = Student_register_courses.objects.filter(date_created__gt=yesterday1).filter(date_created__lt=yesterday2).values_list(
            'course_id_id', flat=True)
        revenue1 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue1 += course.price
    if type1 == 2:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") + datetime.timedelta(7)
        now1 = datetime.datetime.strftime(now1, "%Y-%m-%d 23:59:59")
        before = datetime.datetime.now() - datetime.timedelta(7)
        before1 = datetime.datetime.strftime(before, "%Y-%m-%d 00:00:00")
        before2 = now

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue1 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue1 += course.price

    if type1 == 3:
        now = datetime.datetime.now().strftime("%Y-%m-01 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-%m-31 23:59:59")
        before = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(30)
        before1 = datetime.datetime.strftime(before, "%Y-%m-01 00:00:00")
        before2 = datetime.datetime.strftime(before, "%Y-%m-30 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue1 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue1 += course.price
    if type1 == 4:
        now = datetime.datetime.now().strftime("%Y-01-01 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-12-31 23:59:59")
        before = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(365)
        before1 = datetime.datetime.strftime(before, "%Y-01-01 00:00:00")
        before2 = datetime.datetime.strftime(before, "%Y-12-31 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue1 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue1 += course.price
    if type1 == 5:
        list = Student_register_courses.objects.all().values_list('course_id_id', flat=True)
        revenue = 0
        for ele in list:
            print("ele::", ele)
            course = Courses.objects.get(pk=ele)
            revenue += course.price
        revenue1 = 0

    if type2 == 1:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")
        yesterday = datetime.datetime.now() - datetime.timedelta(1)
        yesterday1 = datetime.datetime.strftime(yesterday, "%Y-%m-%d 00:00:00")
        yesterday2 = datetime.datetime.strftime(yesterday, "%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list('course_id_id', flat=True)
        revenue2 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue2 += course.price
        list = Student_register_courses.objects.filter(date_created__gt=yesterday1).filter(date_created__lt=yesterday2).values_list(
            'course_id_id', flat=True)
        revenue3 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue3 += course.price
        revenue2 = revenue2 / 2
        revenue3 = revenue3 / 2
    if type2 == 2:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") + datetime.timedelta(7)
        now1 = datetime.datetime.strftime(now1, "%Y-%m-%d 23:59:59")
        before = datetime.datetime.now() - datetime.timedelta(7)
        before1 = datetime.datetime.strftime(before, "%Y-%m-%d 00:00:00")
        before2 = now

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue2 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue2 += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue3 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue3 += course.price
        revenue2 = revenue2 / 2
        revenue3 = revenue3 / 2

    if type2 == 3:
        now = datetime.datetime.now().strftime("%Y-%m-01 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-%m-31 23:59:59")
        before = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(30)
        before1 = datetime.datetime.strftime(before, "%Y-%m-01 00:00:00")
        before2 = datetime.datetime.strftime(before, "%Y-%m-30 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue2 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue2 += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue3 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue3 += course.price
        revenue2 = revenue2 / 2
        revenue3 = revenue3 / 2
    if type2 == 4:
        now = datetime.datetime.now().strftime("%Y-01-01 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-12-31 23:59:59")
        before = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(365)
        before1 = datetime.datetime.strftime(before, "%Y-01-01 00:00:00")
        before2 = datetime.datetime.strftime(before, "%Y-12-31 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue2 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue2 += course.price
        list = Student_register_courses.objects.filter(date_created__gt=before1).filter(
            date_created__lt=before2).values_list(
            'course_id_id', flat=True)
        revenue3 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue3 += course.price
        revenue2 = revenue2 / 2
        revenue3 = revenue3 / 2
    if type2 == 5:
        list = Student_register_courses.objects.all().values_list('course_id_id', flat=True)
        revenue2 = 0
        for ele in list:
            print("ele::", ele)
            course = Courses.objects.get(pk=ele)
            revenue2 += course.price
        revenue3 = 0
        revenue2 = revenue2 / 2
        revenue3 = revenue3 / 2

    if type3 == 1:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue4 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue4 += course.price
        revenue5 = revenue4 / 2
        revenue6 = 0
        expenseList = Expense.objects.filter(date_created__gt=now).filter(date_created__lt=now1)
        for item in expenseList:
            revenue6 += item.price
        revenue7 = revenue5 - revenue6
    if type3 == 2:
        now = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
        now1 = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(7)
        now1 = datetime.datetime.strftime(now1, "%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue4 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue4 += course.price
        revenue5 = revenue4 / 2
        revenue6 = 0
        expenseList = Expense.objects.filter(date_created__gt=now).filter(date_created__lt=now1)
        for item in expenseList:
            revenue6 += item.price
        revenue7 = revenue5 - revenue6
    if type3 == 3:
        now = datetime.datetime.now().strftime("%Y-%m-01 00:00:00")
        now1 = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(30)
        now1 = datetime.datetime.strftime(now1, "%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue4 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue4 += course.price
        revenue5 = revenue4 / 2
        revenue6 = 0
        expenseList = Expense.objects.filter(date_created__gt=now).filter(date_created__lt=now1)
        for item in expenseList:
            revenue6 += item.price
        revenue7 = revenue5 - revenue6
    if type3 == 4:
        now = datetime.datetime.now().strftime("%Y-01-01 00:00:00")
        now1 = datetime.datetime.strptime(now, "%Y-%m-%d 00:00:00") - datetime.timedelta(365)
        now1 = datetime.datetime.strftime(now1, "%Y-%m-%d 23:59:59")

        list = Student_register_courses.objects.filter(date_created__gt=now).filter(date_created__lt=now1).values_list(
            'course_id_id', flat=True)
        revenue4 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue4 += course.price
        revenue5 = revenue4 / 2
        revenue6 = 0
        expenseList = Expense.objects.filter(date_created__gt=now).filter(date_created__lt=now1)
        for item in expenseList:
            revenue6 += item.price
        revenue7 = revenue5 - revenue6
    if type3 == 5:
        list = Student_register_courses.objects.all().values_list(
            'course_id_id', flat=True)
        revenue4 = 0
        for ele in list:
            course = Courses.objects.get(pk=ele)
            revenue4 += course.price
        revenue5 = revenue4 / 2
        revenue6 = 0
        expenseList = Expense.objects.all()
        for item in expenseList:
            revenue6 += item.price
        revenue7 = revenue5 - revenue6

    return render(request, 'financial.html', {'type1': type1, 'type2': type2, 'type3': type3, 'revenue': revenue, 'revenue1': revenue1, 'revenue2': revenue2, 'revenue3': revenue3, 'revenue4': revenue4, 'revenue5': revenue5, 'revenue6': revenue6, 'revenue7': revenue7, 'menu_no':1})

def sales(request):
    # get sales target:
    sales = len(Student_register_courses.objects.all())

    #get course target:
    courses = len(Courses.objects.filter(approval_status=2))

    #user target:
    students = len(User.objects.filter(group_id=2))
    teachers = len(User.objects.filter(group_id=1))
    users = students + teachers

    target = Admintarget.objects.get(pk=1)
    sale_target = target.sale_target
    course_target = target.course_target
    user_target = target.user_target
    if sale_target != 0:
        sale_percent = sales / sale_target * 100
    else:
        sale_percent = 0
    if course_target != 0:
        course_percent = courses / course_target * 100
    else:
        course_percent = 0
    if user_target != 0:
        user_percent = users / user_target * 100
    else:
        user_percent = 0
    return render(request, 'sales.html', {'sales': sales, 'courses': courses, 'users': users, 'sale_target': sale_target, 'course_target': course_target, 'user_target': user_target, 'sale_percent': sale_percent, 'course_percent': course_percent, 'user_percent': user_percent, 'menu_no':2})

@csrf_exempt
def saveTarget(request):
    key = request.POST.get('key')
    data = request.POST.get('data')
    status = 1
    target = Admintarget.objects.get(pk=1)
    try:
        if int(key) == 1:
            target.sale_target = data
        elif int(key) == 2:
            target.course_target = data
        else:
            target.user_target = data
        target.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def getCourseVideo(request):
    id = request.POST.get('id')
    section_list = Sections.objects.filter(course_id=id).values_list('id', flat=True)
    section_list = map(str, section_list)
    section_str = ','.join(section_list)
    videoList = VideoUploads.objects.extra(where=['FIND_IN_SET(section_id, "' + section_str + '")'])
    ret = {
        'videos': serializers.serialize('json', videoList)
    }
    return JsonResponse(ret, safe=False)

def performance(request):
    return render(request, 'performance.html', {'menu_no':3})


def marketing(request):
    search = request.POST.get('search')
    type = request.POST.get('type')
    if search == None:
        search = ''
    if type == None or type == '':
        type = 1
    else:
        type = int(type)
    courseList = Courses.objects.filter(approval_status=2).filter(Q(name__contains=search) | Q(user_name__contains=search))
    for course in courseList:
        rateList = Course_comments.objects.filter(course_id_id=course.id)
        key = 0
        sum = 0
        for rate in rateList:
            sum += rate.rating
            key += 1
        if key == 0:
            course.rating = 0
        else :
            course.rating = sum / key
        course.student_count = key

    if type == 1:
        courses = sorted(courseList, key=attrgetter('rating'), reverse=True)[:20]
    else :
        courses = sorted(courseList, key=attrgetter('student_count'), reverse=True)[:20]

    print("courses", courses)

    return render(request, 'marketing.html', {'courses': courses, 'search': search, 'type':type, 'menu_no':4})


def security(request):
    return render(request, 'security.html', {'menu_no':5})


def notifications(request):
    id = request.user.id
    notifications = Adminnotifications.objects.filter(receiver_id=id)
    return render(request, 'notifications.html', { 'notifications': notifications ,'menu_no':6})

def subNotifications(request):
    noti_id = request.GET.get("noti_id")
    notification = Adminnotifications.objects.get(pk=noti_id)
    notification.is_read = 1
    notification.save()
    return render(request, 'notification.html', {'notification': notification})

# @csrf_exempt
# def saveNotification(request):
#     data = request.POST
#     sender_id = data.get('sender_id')
#     receiver_id = data.get('receiver_id')
#     title = data.get('title')
#     good_bad = data.get('good_bad')
#     content = data.get('content')
#
#     now = datetime.datetime.now()
#     time = now.strftime("%Y-%m-%d %H:%M:%S")
#
#     status = 0
#     try :
#         noti = Adminnotifications(
#             sender_id=sender_id,
#             receiver_id=receiver_id,
#             title=title,
#             good_bad=good_bad,
#             content=content,
#             is_read=0,
#             time=time
#         )
#         noti.save()
#     except:
#         status = 1
#     ret = {
#         'status': status
#     }
#     return JsonResponse(ret)

@csrf_exempt
def saveNotificationFromEmployee(request):
    data = request.POST
    title = data.get('title')
    content = data.get('content')
    sender_id = data.get('sender_id')
    receiver_list = Admin.objects.filter(role__lt=2).values_list('id', flat=True)
    now = datetime.datetime.now()
    time = now.strftime("%Y-%m-%d %H:%M:%S")
    status = 1
    try:
        for ele in receiver_list:
            noti = Adminnotifications(
                title=title,
                content=content,
                sender_id=sender_id,
                receiver_id=ele,
                time=time,
                is_read=0,
                good_bad=3
            )
            noti.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteNotification(request):
    data = request.POST
    id = data.get('id')
    status = 0
    try:
        Adminnotifications.objects.get(pk=id).delete()
    except:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def getNavNotiInfo(request):
    id = request.user.id
    notifications = Adminnotifications.objects.filter(receiver_id=id, is_read=0).order_by('-time')[:3]
    ret = {
        'noti': serializers.serialize('json', notifications)
    }
    return JsonResponse(ret, safe=False)

def expenses(request):
    expenseList = Expense.objects.all()
    page = request.POST.get('page')
    if page == None or page == '':
        page = 1
    else:
        page = int(page)
    paginator = Paginator(expenseList, settings.DEFAULT_PAGESIZE)
    try:
        expenses = paginator.page(page)
    except PageNotAnInteger:
        expenses = paginator.page(1)
    except EmptyPage:
        expenses = paginator.page(paginator.num_pages)
    return render(request, 'expenses.html', {'page': page, 'expenses': expenses, 'menu_no':7})

@csrf_exempt
def saveExpense(request):
    name = request.POST.get('name')
    buyer = request.POST.get('buyer')
    price = request.POST.get('price')
    description = request.POST.get('description')
    status = 1
    try:
        if request.POST.get('id') == None:
            ele = Expense(
                name=name,
                buyer=buyer,
                price=price,
                description=description
            )
            ele.save()
        else :
            id = request.POST.get('id')
            ele = Expense.objects.get(pk=id)
            ele.name = name
            ele.buyer = buyer
            ele.price = price
            ele.description = description
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteExpense(request):
    id = request.POST.get('id')
    status = 1
    try:
        Expense.objects.get(pk=id).delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def control(request):
    categories = Categories.objects.all()
    one = Admincontrol.objects.get(pk=1)
    return render(request, 'control.html', {'categories': categories, 'cat_id': int(one.priority), 'student_tax': one.student_tax, 'teacher_tax': one.teacher_tax, 'menu_no':8})

@csrf_exempt
def priorityChange(request):
    id = request.POST.get('id')
    status = 1
    try:
        if len(Admincontrol.objects.all()) == 0:
            ele = Admincontrol(
                priority=id
            )
            ele.save()
        else:
            ele = Admincontrol.objects.get(pk=1)
            ele.priority = id
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def saveStudentTax(request):
    tax = request.POST.get('tax')
    status = 1
    try:
        if len(Admincontrol.objects.all()) == 0:
            ele = Admincontrol(
                student_tax=tax
            )
            ele.save()
        else:
            ele = Admincontrol.objects.get(pk=1)
            ele.student_tax = tax
            ele.save()
    except:
        status = 0
    ret = {
        'status': status,
        'tax': tax
    }
    return JsonResponse(ret)

@csrf_exempt
def saveTeacherTax(request):
    tax = request.POST.get('tax')
    status = 1
    try:
        if len(Admincontrol.objects.all()) == 0:
            ele = Admincontrol(
                teacher_tax=tax
            )
            ele.save()
        else:
            ele = Admincontrol.objects.get(pk=1)
            ele.teacher_tax = tax
            ele.save()
    except:
        status = 0
    ret = {
        'status': status,
        'tax': tax
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteStudentTax(request):
    status = 1
    try:
        ele = Admincontrol.objects.get(pk=1)
        ele.student_tax = 0
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteTeacherTax(request):
    status = 1
    try:
        ele = Admincontrol.objects.get(pk=1)
        ele.teacher_tax = 0
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def works(request):
    page = request.POST.get('page')
    search = request.POST.get('search')
    status = request.POST.get('status')
    if page == '' or page == None:
        page = 1
    else :
        page = int(page)

    if status == None or status == '':
        status = 1
    else :
        status = int(status)

    if search == None:
        search = ''
    taskList = Task.objects.all()
    taskListTmp = []
    for task in taskList:
        if search in task.receiver.name:
            taskListTmp.append(task)

    taskListTmpFinal = []
    taskListTmpFinal1 = []

    for task in taskListTmp:
        end_date = task.end_date
        done_date = task.done_date
        cur_time = datetime.datetime.now()
        end_time = datetime.datetime.strptime(end_date,"%Y-%m-%d")
        interval = (cur_time - end_time).total_seconds()
        if done_date == '':
            if interval > 3600 * 24 * 2:
                task.status = 3 #incomplete
            else:
                task.status = 0 #new
        else:
            done_time = datetime.datetime.strptime(done_date, "%Y-%m-%d")
            interval1 = (done_time - end_time).total_seconds()
            if interval1 < 3600 * 24:
                task.status = 1 #complete
            elif interval1 < 3600 * 24 * 2:
                task.status = 2 #late
            else:
                task.status = 3 #incomplte

        if task.status == status:
            taskListTmpFinal.append(task)
        if task.status != 0:
            taskListTmpFinal1.append(task)

    if status == 0:
        taskListTmpFinal = taskListTmpFinal1
    paginator = Paginator(taskListTmpFinal, settings.DEFAULT_PAGESIZE)
    try:
        tasks = paginator.page(page)
    except PageNotAnInteger:
        tasks = paginator.page(1)
    except EmptyPage:
        tasks = paginator.page(paginator.num_pages)
    return render(request, 'works.html', {'search': search, 'page': page, 'tasks': tasks, 'status': status, 'menu_no':9})


def tasks(request):
    id = request.user.id
    type = request.POST.get("type")
    print("type::", type)
    if type == '' or type == None:
        type = 0
    else :
        type = int(type)
    page = request.POST.get('page')
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    taskList = Task.objects.filter(receiver_id=id)
    taskListTmp = []
    count = 0
    for task in taskList:
        end_date = task.end_date
        done_date = task.done_date
        cur_time = datetime.datetime.now()
        end_time = datetime.datetime.strptime(end_date,"%Y-%m-%d")
        interval = (cur_time - end_time).total_seconds()
        if done_date == '':
            if interval > 3600 * 24 * 2:
                task.status = 3 #incomplete
            else:
                task.status = 0 #new
        else:
            done_time = datetime.datetime.strptime(done_date, "%Y-%m-%d")
            interval1 = (done_time - end_time).total_seconds()
            if interval1 < 3600 * 24:
                task.status = 1 #complete
            elif interval1 < 3600 * 24 * 2:
                task.status = 2 #late
            else:
                task.status = 3 #incomplte
        if task.status == 0:
            count += 1
        if task.status == type:
            taskListTmp.append(task)

    paginator = Paginator(taskListTmp, settings.DEFAULT_PAGESIZE)
    try:
        tasks = paginator.page(page)
    except PageNotAnInteger:
        tasks = paginator.page(1)
    except EmptyPage:
        tasks = paginator.page(paginator.num_pages)

    return render(request, 'tasks.html', {'taskList': tasks, 'type': type, 'taskcount': count, 'menu_no':21})

@csrf_exempt
def saveTask(request):
    data = request.POST
    title = data.get('title')
    day = data.get('day')
    priority = data.get('priority')
    description = data.get('description')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    status = 1
    try:
        task = Task(
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date,
            priority=priority,
            sender_id=sender_id,
            receiver_id=receiver_id
        )
        task.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def completeTask(request):
    file = request.FILES
    _file = file.get('file')
    task_id = request.POST.get('task_id')
    answer = request.POST.get('answer')
    filename = _file._get_name()
    ext = filename[filename.rfind('.'):]
    file_name = str(uuid.uuid4()) + ext
    path = '/img/user_images/'
    full_path = str(path) + str(file_name)
    fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')
    for chunk in _file.chunks():
        fd.write(chunk)
    fd.close()
    done_date = datetime.datetime.now().strftime("%Y-%m-%d")
    task = Task.objects.get(pk=task_id)
    task.file_url = full_path
    task.answer = answer
    task.done_date = done_date
    task.save()
    status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteTask(request):
    id = request.POST.get('id')
    status = 1
    try:
        Task.objects.get(pk=id).delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)


def discount(request):

    # get discount
    discount = Discount.objects.all()
    if discount.count() == 0:
        exist = 0
    else:
        exist = 1
    #show all courses;
    page = request.POST.get('page')
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    type = request.POST.get('type')
    if type == '' or type == None:
        type = 0
    else:
        type = int(type)

    search = request.POST.get('search')
    if search == None:
        search = ''

    if exist == 1:
        course_list = Courses.objects.filter(approval_status=2)
        course_list_tmp = []
        for course in course_list:
            not_str = discount[0].not_apply_course
            not_list = not_str.split(',')
            if search in course.user.first_name + course.user.last_name or search in course.name:
                if type == 1:
                    if str(course.id) not in not_list:
                        course_list_tmp.append(course)
                elif type == 2:
                    if str(course.id) in not_list:
                        course_list_tmp.append(course)
                else:
                    course_list_tmp.append(course)
        paginator = Paginator(course_list_tmp, settings.DEFAULT_PAGESIZE)
        try:
            course_list = paginator.page(page)
        except PageNotAnInteger:
            course_list = paginator.page(1)
        except EmptyPage:
            course_list = paginator.page(paginator.num_pages)
        for course in course_list:
            if exist == 0:
                course.discount = 0
                course.discount_price = course.price
            else:
                course.discount = discount[0].discount
                course.discount_price = course.price * (100 - discount[0].discount) / 100
                not_str = discount[0].not_apply_course
                not_list = not_str.split(',')
                if str(course.id) in not_list:
                    course.discount_not_allow = 1
                else:
                    course.discount_not_allow = 0
    else:
        course_list = []

    return render(request, 'discount.html', {'menu_no':10, 'course_list': course_list, 'discount': discount, 'exist': exist, 'page': page, 'search':search, 'type': type})

@csrf_exempt
def createDiscount(request):
    description = request.POST.get('description')
    discount = request.POST.get('discount')
    expire = request.POST.get('expire')
    expire_date = datetime.datetime.now() + datetime.timedelta(int(expire))
    expire_date = datetime.datetime.strftime(expire_date, '%Y-%m-%d')
    status = 1
    try:
        if Discount.objects.all().count() == 0:
            ele = Discount(
                discount=discount,
                not_apply_course='',
                expire_date=expire_date,
                description=description
            )
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteDisount(request):
    status = 1
    try:
        if Discount.objects.all().count() > 0:
            ele = Discount.objects.all()[0]
            ele.delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def disableDiscount(request):
    id = request.POST.get('id')
    type = request.POST.get('type')
    type = int(type)
    status = 1
    try:
        if Discount.objects.all().count() > 0:
            discount = Discount.objects.all()[0]
            not_str = discount.not_apply_course
            not_list = not_str.split(',')
            print("type::here :::", type)
            if type == 0:
                print("noti_list::", not_list)
                print("id::", id)
                if str(id) not in not_list:
                    not_str = not_str + "," + str(id)
                    print("not_strstrstr::", not_str)
                    discount.not_apply_course = not_str
                discount.save()
            else:
                print("if then here???")
                for ele in not_list:
                    if ele == str(id):
                        not_list.remove(ele)
                not_str = ','.join(not_list)
                discount.not_apply_course = not_str
                discount.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def refund(request):
    type = request.POST.get('type')
    search = request.POST.get('search')
    page = request.POST.get('page')
    if type == None or type == '':
        type = 1
    else:
        type = int(type)
    if search == None:
        search = ''
    if page == None or page == '':
        page = 1
    else:
        page = int(page)

    refundList = Refund.objects.filter(approval_status=type)

    refundListTmp = []
    for refund in refundList:
        if search in refund.student.first_name + refund.student.last_name or search in refund.course.name:
            refundListTmp.append(refund)

    paginator = Paginator(refundListTmp, settings.DEFAULT_PAGESIZE)
    try:
        refunds = paginator.page(page)
    except PageNotAnInteger:
        refunds = paginator.page(1)
    except EmptyPage:
        refunds = paginator.page(paginator.num_pages)

    for refund in refunds:
        if Student_register_courses.objects.filter(course_id_id=refund.course_id, student_id_id=refund.student_id).exists():
            ele = Student_register_courses.objects.filter(course_id_id=refund.course_id, student_id_id=refund.student_id)[0]
            refund.date = ele.date_created
        else:
            refund.date = ''
        time1 = datetime.datetime.now().strftime("%Y-%m-01 00:00:00")
        time2 = datetime.datetime.now().strftime("%Y-%m-31 00:00:00")
        refund.total_count = len(Refund.objects.filter(date_created__gt=time1).filter(date_created__lt=time2).filter(student_id=refund.student_id))

    return render(request, 'refund.html', {'refunds': refunds, 'type': type, 'search': search, 'page': page, 'menu_no':11 })

def payout(request):
    search = request.POST.get('search')
    page = request.POST.get('page')
    status = request.POST.get('status')
    if search == None:
        search = ''
    if page == None or page == '':
        page = 1
    else:
        page = int(page)

    if status == None or status == '':
        status = 0
    else:
        status = int(status)

    if status == 0:
        ready_list = Student_register_courses.objects.filter(withdraw=2)
    else:
        ready_list = Student_register_courses.objects.filter(withdraw=3)
    teacher_list = []
    for ele in ready_list:
        if ele.course_id.user_id not in teacher_list:
            teacher_list.append(ele.course_id.user_id)
    list = []
    for teacher in teacher_list:
        course_list = Courses.objects.filter(user_id=teacher).values_list('id',flat=True)
        course_list = map(str, course_list)
        course_list_id = ','.join(course_list)
        if status == 0:
            ready_list = Student_register_courses.objects.extra(where=['find_in_set(course_id_id, "'+course_list_id+'")']).filter(withdraw=2)
        else:
            ready_list = Student_register_courses.objects.extra(where=['find_in_set(course_id_id, "'+course_list_id+'")']).filter(withdraw=3)
        sum = 0
        for one in ready_list:
            sum += one.course_id.price
        user = User.objects.get(pk=teacher)
        user.total_amount = sum
        if Card.objects.filter(user_id=teacher).exists():
            card = Card.objects.filter(user_id=teacher)[0]
            user.bank_name = card.bank_number
            user.card_number = card.card_number
            user.card_name = card.card_name
        else:
            user.bank_name = ''
            user.card_number = ''
            user.card_name = ''
        list.append(user)
    listTmp = []
    for teacher in list:
        if search in teacher.first_name + teacher.last_name:
            listTmp.append(teacher)
    # listTmp = paginator(listTmp, 20)
    paginator = Paginator(listTmp, settings.DEFAULT_PAGESIZE)
    try:
        list = paginator.page(page)
    except PageNotAnInteger:
        list = paginator.page(1)
    except EmptyPage:
        list = paginator.page(paginator.num_pages)

    return render(request, 'payout.html', {'search': search, 'page': page, 'status': status, 'list': list, 'menu_no':12})

@csrf_exempt
def payoutApprove(request):
    teacher_id = request.POST.get('teacher_id')
    status = 1
    try:
        course_list = Courses.objects.filter(user_id=teacher_id).values_list('id', flat=True)
        course_list = map(str, course_list)
        course_id = ','.join(course_list)
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        Student_register_courses.objects.extra(where=['find_in_set(course_id_id, "'+course_id+'")']).filter(withdraw=2).update(withdraw=3,approve_date=now)
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def payoutDelete(request):
    teacher_id = request.POST.get('teacher_id')
    status = 1
    try:
        course_list = Courses.objects.filter(user_id=teacher_id).values_list('id', flat=True)
        course_list = map(str, course_list)
        course_list_id = ','.join(course_list)
        ready_list = Student_register_courses.objects.extra(where=['find_in_set(course_id_id, "' + course_list_id + '")']).filter(withdraw=3).update(withdraw=4)
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def spam(request):
    type = request.POST.get('type')
    search = request.POST.get('search')
    page = request.POST.get('page')
    if type == None or type == '':
        type = 1
    else:
        type = int(type)
    if search == None:
        search = ''
    if page == None or page == '':
        page = 1
    else:
        page = int(page)
    spamList = Spam.objects.filter(approval_status=type).order_by('-date_created')

    spamListTmp = []
    for spam in spamList:
        if search in spam.student.first_name + spam.student.last_name or search in spam.teacher.first_name + spam.teacher.last_name:
            spamListTmp.append(spam)

    for spam in spamListTmp:
        count = len(Spam.objects.filter(student_id=spam.student_id))
        spam.total_count = count
    paginator = Paginator(spamListTmp, settings.DEFAULT_PAGESIZE)
    try:
        spams = paginator.page(page)
    except PageNotAnInteger:
        spams = paginator.page(1)
    except EmptyPage:
        spams = paginator.page(paginator.num_pages)

    print("type::", type)
    return render(request, 'spam.html', {'spams': spams, 'type': type, 'search': search, 'page': page, 'menu_no':13})

@csrf_exempt
def spamSetApprove(request):
    id = request.POST.get('id')
    print("id::", id)
    status = 1
    try:
        ele = Spam.objects.get(pk=id)
        ele.approval_status = 2
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def refundSetApprove(request):
    id = request.POST.get('id')
    course_id = request.POST.get('course_id')
    student_id = request.POST.get('student_id')
    status = 1
    try:
        ele = Refund.objects.get(pk=id)
        ele.approval_status = 2
        ele.save()
        if Student_register_courses.objects.filter(course_id_id=course_id, student_id_id=student_id).exists():
            item = Student_register_courses.objects.filter(course_id_id=course_id, student_id_id=student_id)[0]
            item.delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def refundSetCancel(request):
    id = request.POST.get('id')
    status = 1
    try:
        ele = Refund.objects.get(pk=id)
        ele.approval_status = 3
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

def courses(request):
    search = request.POST.get('search')
    type = request.POST.get('type')
    page = request.POST.get('page')
    if type == '' or type == None:
        type = 0
    else :
        type = int(type)
    if page == '' or page == None:
        page = 1
    else :
        page = int(page)
    if search == None:
        search = ''
    if type == 0:
        courseList = Courses.objects.filter(Q(name__contains=search) | Q(user_name__contains=search) | Q(id__contains=search)).filter(approval_status=2)
    else :
        courseList = Courses.objects.filter(Q(name__contains=search) | Q(user_name__contains=search) | Q(id__contains=search)).filter(scat_id=type).filter(approval_status=2)
    allList = Courses.objects.filter(approval_status=2)
    paidList = Courses.objects.filter(type=1).filter(approval_status=2)
    freeList = Courses.objects.filter(type=0).filter(approval_status=2)
    paginator = Paginator(courseList, settings.DEFAULT_PAGESIZE)
    try:
        courses = paginator.page(page)
    except PageNotAnInteger:
        courses = paginator.page(1)
    except EmptyPage:
        courses = paginator.page(paginator.num_pages)

    categories = Categories.objects.all()
    return render(request, 'courses.html', {'courses': courses, 'type': type, 'page': page, 'search': search, 'allCount': len(allList), 'freeCount': len(freeList), 'paidCount': len(paidList), 'categories': categories, 'menu_no':14})


def review(request):
    search = request.POST.get('search')
    page = request.POST.get('page')
    type = request.POST.get('type')

    if search == None:
        search = ''
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    if type == '' or type == None:
        type = 1
    else:
        type = int(type)
    courses_list = []
    awaiting_count = len(
        Courses.objects.filter(approval_status=1).filter(Q(name__contains=search) | Q(user_name__contains=search)))
    approved_count = len(
        Courses.objects.filter(approval_status=2).filter(Q(name__contains=search) | Q(user_name__contains=search)))
    canceled_count = len(
        Courses.objects.filter(approval_status=3).filter(Q(name__contains=search) | Q(user_name__contains=search)))
    if type * 1 == 1:
        courses_list = Courses.objects.filter(approval_status=1).filter(
            Q(name__contains=search) | Q(user_name__contains=search))
    elif type * 1 == 2:
        courses_list = Courses.objects.filter(approval_status=2).filter(
            Q(name__contains=search) | Q(user_name__contains=search))
    else:
        courses_list = Courses.objects.filter(approval_status=3).filter(
            Q(name__contains=search) | Q(user_name__contains=search))
    paginator = Paginator(courses_list, settings.DEFAULT_PAGESIZE)
    try:
        courses = paginator.page(page)
    except PageNotAnInteger:
        courses = paginator.page(1)
    except EmptyPage:
        courses = paginator.page(paginator.num_pages)

    for course in courses:
        secIdList = Sections.objects.filter(course_id=course.id).values_list('id', flat=True)
        secIdList = map(str, secIdList)
        secIdStr = ','.join(secIdList)
        videoList = VideoUploads.objects.extra(where=['FIND_IN_SET(section_id, "' + secIdStr + '")']).values_list('url',flat=True)
        videoList = map(str, videoList)
        videoUrlStr = ','.join(videoList)
        course.video_url = videoUrlStr

    return render(request, 'review.html', {
        'courses': courses,
        'type': type,
        'search': search,
        'page': page,
        'awaiting_count': awaiting_count,
        'approved_count': approved_count,
        'canceled_count': canceled_count,
        'menu_no': 15
    })

def teachers(request):
    search = request.POST.get("search")
    page = request.POST.get("page")
    if search == None:
        search = ''
    if page == '' or page == None:
        page = 1
    else :
        page = int(page)

    allList = User.objects.filter(group_id=2)
    teacherList = User.objects.filter(group_id=2).filter(Q(first_name__contains=search) | Q(last_name__contains=search) | Q(email__contains=search))
    paginator = Paginator(teacherList, settings.DEFAULT_PAGESIZE)
    try:
        teachers = paginator.page(page)
    except PageNotAnInteger:
        teachers = paginator.page(1)
    except EmptyPage:
        teachers = paginator.page(paginator.num_pages)

    for teacher in teachers:
        course_ids = Courses.objects.filter(user_id=teacher.id).values_list('id', flat=True)
        course_ids = map(str, course_ids)
        course_str = ','.join(course_ids)
        teacher.student_count = Student_register_courses.objects.extra(where=['FIND_IN_SET(course_id_id, "' + course_str + '")']).count()
        teacher.free_course = Courses.objects.filter(user_id=teacher.id, type=1).count()
        teacher.paid_course = Courses.objects.filter(user_id=teacher.id, type=0).count()
        teacher.spam = Spam.objects.filter(teacher_id=teacher.id).count()

    return render(request, 'teachers.html', {'teachers': teachers,'teacherCount': len(allList), 'page': page, 'search': search, 'menu_no':17})

@csrf_exempt
def saveTeacher(request):
    id = request.POST.get('id')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    status = 1
    try:
        user = User.objects.get(pk=id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
    except:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteTeacher(request):
    id = request.POST.get("id")
    status = 1
    try:
        User.objects.get(pk=id).delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)


def students(request):
    page = request.POST.get('page')
    search = request.POST.get('search')
    category = request.POST.get('category')

    if search == None:
        search = ''
    if page == '' or page == None:
        page = 1
    else :
        page = int(page)
    if category == None or category == '':
        category = 0
    else:
        category = int(category)
    allList = User.objects.filter(group_id=1)
    if category == 0:
        studentList = User.objects.filter(group_id=1).filter(Q(first_name__contains=search) | Q(last_name__contains=search) | Q(email__contains=search))
    else:
        studentListTmp = User.objects.filter(group_id=1).filter(
            Q(first_name__contains=search) | Q(last_name__contains=search) | Q(email__contains=search))
        studentList = []
        for student in studentListTmp:
            flag = 0
            course_list = Student_register_courses.objects.filter(student_id_id=student.id)
            for course in course_list:
                if course.course_id.scat_id == category:
                    flag = 1
            if flag == 1:
                studentList.append(student)

    paginator = Paginator(studentList, settings.DEFAULT_PAGESIZE)
    try:
        students = paginator.page(page)
    except PageNotAnInteger:
        students = paginator.page(1)
    except EmptyPage:
        students = paginator.page(paginator.num_pages)
    for student in students:
        course_list = Student_register_courses.objects.filter(student_id_id=student.id)
        paid_course = 0
        free_course = 0
        if category == 0:
            for course in course_list:
                if course.course_id.type == 0:
                    paid_course += 1
                else:
                    free_course += 1
        else:
            for course in course_list:
                if course.course_id.type == 0 and course.course_id.scat_id == category:
                    paid_course += 1
                elif course.course_id.type == 1 and course.course_id.scat_id == category:
                    free_course += 1
        student.paid_course_cnt = paid_course
        student.free_course_cnt = free_course
        student.spam = Spam.objects.filter(student_id=student.id).count()
    categories = Categories.objects.all()
    return render(request, 'students.html', {'students': students, 'page': page, 'studentCount': len(allList), 'search': search, 'categories': categories, 'category':category, 'menu_no':18})

@csrf_exempt
def saveStudent(request):
    print("test::", request.POST)
    id = request.POST.get('id')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    status = 1
    try:
        user = User.objects.get(pk=id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
    except:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteStudent(request):
    id = request.POST.get("id")
    status = 1
    try:
        User.objects.get(pk=id).delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    print("ret:::", ret)
    return JsonResponse(ret)

def test(request):
    search = request.POST.get('search')
    page = request.POST.get('page')
    if search == None:
        search = ''
    video_list = TestVideo.objects.all()
    videoList = []
    for video in video_list:
        user = User.objects.filter(id=video.user_id).filter(
            Q(email__contains=search) | Q(first_name__contains=search) | Q(last_name__contains=search))
        if len(user) == 1:
            videoList.append(video)

    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    paginator = Paginator(videoList, settings.DEFAULT_PAGESIZE)
    try:
        videos = paginator.page(page)
    except PageNotAnInteger:
        videos = paginator.page(1)
    except EmptyPage:
        videos = paginator.page(paginator.num_pages)

    return render(request, 'test.html', {'video_list': videos, 'search': search, 'menu_no':16})

@login_required(login_url='/')
def employees(request):
    search = request.POST.get('search')
    page = request.POST.get('page')
    if search == None:
        search = ''
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    employeeList = Admin.objects.filter(role=2).filter(name__contains=search)
    totalCnt = len(employeeList)
    paginator = Paginator(employeeList, settings.DEFAULT_PAGESIZE)
    try:
        employees = paginator.page(page)
    except PageNotAnInteger:
        employees = paginator.page(1)
    except EmptyPage:
        employees = paginator.page(paginator.num_pages)
    positions = Position.objects.all()
    return render(request, 'employees.html', {'employees': employees, 'positions': positions, 'search': search, 'totalCnt': totalCnt, 'menu_no':19})


def superusers(request):
    search = request.POST.get('search')
    page = request.POST.get('page')
    if search == None:
        search = ''
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    superuserList = Admin.objects.filter(role=1).filter(name__contains=search)
    totalCnt = len(superuserList)
    paginator = Paginator(superuserList, settings.DEFAULT_PAGESIZE)
    try:
        superusers = paginator.page(page)
    except PageNotAnInteger:
        superusers = paginator.page(1)
    except EmptyPage:
        superusers = paginator.page(paginator.num_pages)
    positions = Position.objects.all()
    return render(request, 'superusers.html', {'superusers': superusers, 'positions': positions, 'search': search, 'totalCnt': totalCnt, 'menu_no':20})


def single_superuser(request):
    if request.user.role != 0:
        return HttpResponseRedirect('/')
    id = request.GET.get('id')
    superuser = Admin.objects.get(pk=id)
    # session_duration
    time = datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
    uptime = datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")
    logList = Logtime.objects.filter(user_id=request.user.id).filter(in_time__gt=time).filter(
        out_time__lt=uptime).filter(~Q(out_time=''))
    logList1 = Logtime.objects.filter(user_id=request.user.id).filter(in_time__gt=time).filter(out_time='')
    totaltime = 0
    for item in logList:
        t1 = datetime.datetime.strptime(item.in_time, "%Y-%m-%d %H:%M:%S")
        t2 = datetime.datetime.strptime(item.out_time, "%Y-%m-%d %H:%M:%S")
        totaltime += (t2 - t1).total_seconds()
    for item in logList1:
        t2 = datetime.datetime.now()
        t1 = datetime.datetime.strptime(item.in_time, "%Y-%m-%d %H:%M:%S")
        totaltime += (t2 - t1).total_seconds()
    totaltime = int(totaltime)
    hr = int(totaltime / 3600)
    mm = int((totaltime - 3600 * hr) / 60)
    sc = int(totaltime - 3600 * hr - mm * 60)
    session_time = "{0}:{1}:{2}".format(hr, mm, sc)
    print("session time:", session_time)
    return render(request, 'single_superuser.html', {'superuser': superuser, 'session_time': session_time})


def single_employee(request):
    if request.user.role == 2:
        return HttpResponseRedirect('/')
    id = request.GET.get('id')
    employee = Admin.objects.get(pk=id)

    # get notification list to this employee
    good_bad = request.POST.get('good_bad')
    if good_bad == '' or good_bad == None:
        good_bad = 0
    else :
        good_bad = int(good_bad)
    page = request.POST.get('page')
    if page == '' or page == None:
        page = 1
    else:
        page = int(page)
    if good_bad != 0:
        notificationList = Adminnotifications.objects.filter(good_bad=good_bad, receiver_id=id)
    else :
        notificationList = Adminnotifications.objects.filter(receiver_id=id)
    paginator = Paginator(notificationList, settings.DEFAULT_PAGESIZE)
    try:
        notifications = paginator.page(page)
    except PageNotAnInteger:
        notifications = paginator.page(1)
    except EmptyPage:
        notifications = paginator.page(paginator.num_pages)
    positions = Position.objects.all()

    taskList = Task.objects.filter(receiver_id=id)
    taskListTmp = []
    count = 0
    type = request.POST.get('type')
    if type == '' or type == None:
        type = 0
    else:
        type = int(type)

    for task in taskList:
        end_date = task.end_date
        done_date = task.done_date
        cur_time = datetime.datetime.now()
        end_time = datetime.datetime.strptime(end_date, "%Y-%m-%d")
        interval = (cur_time - end_time).total_seconds()
        if done_date == '':
            if interval > 3600 * 24 * 2:
                task.status = 3  # incomplete
            else:
                task.status = 0  # new
        else:
            done_time = datetime.datetime.strptime(done_date, "%Y-%m-%d")
            interval1 = (done_time - end_time).total_seconds()
            if interval1 < 3600 * 24:
                task.status = 1  # complete
            elif interval1 < 3600 * 24 * 2:
                task.status = 2  # late
            else:
                task.status = 3  # incomplte
        if task.status == 0:
            count += 1
        if task.status == type:
            taskListTmp.append(task)

    page1 = request.POST.get('page1')
    if page1 == '' or page1 == None:
        page1 = 1
    else:
        page1 = int(page1)

    paginator1 = Paginator(taskListTmp, settings.DEFAULT_PAGESIZE)
    try:
        tasks = paginator1.page(page1)
    except PageNotAnInteger:
        tasks = paginator1.page(1)
    except EmptyPage:
        tasks = paginator1.page(paginator1.num_pages)

    #session_duration
    time=datetime.datetime.now().strftime("%Y-%m-%d 00:00:00")
    uptime=datetime.datetime.now().strftime("%Y-%m-%d 23:59:59")
    logList = Logtime.objects.filter(user_id=request.user.id).filter(in_time__gt=time).filter(out_time__lt=uptime).filter(~Q(out_time=''))
    logList1 = Logtime.objects.filter(user_id=request.user.id).filter(in_time__gt=time).filter(out_time='')
    totaltime = 0
    for item in logList:
        t1 = datetime.datetime.strptime(item.in_time, "%Y-%m-%d %H:%M:%S")
        t2 = datetime.datetime.strptime(item.out_time, "%Y-%m-%d %H:%M:%S")
        totaltime += (t2 - t1).total_seconds()
    for item in logList1:
        t2 = datetime.datetime.now()
        t1 = datetime.datetime.strptime(item.in_time, "%Y-%m-%d %H:%M:%S")
        totaltime += (t2 - t1).total_seconds()
    totaltime = int(totaltime)
    hr = int(totaltime / 3600)
    if hr < 10:
        hr = '0' + str(hr)
        hr = int(hr)
    mm = int((totaltime - 3600 * hr) / 60)
    if mm < 10:
        mm = '0' + str(mm)
        mm = int(mm)
    sc = int(totaltime - 3600*hr - mm * 60)
    if sc < 10:
        sc = '0' + str(sc)
        sc = int(sc)
    session_time = "{0}:{1}:{2}".format(hr, mm, sc)
    print("session time:",  session_time)
    return render(request, 'single_employee.html', {'employee': employee, 'notifications': notifications, 'good_bad': good_bad, 'positions': positions, 'id': id, 'session_time': session_time, 'tasks': tasks, 'type': type})


def single_teacher(request):
    id = request.GET.get('id')
    page = request.POST.get('page')
    search = request.POST.get('search')
    type = request.POST.get('type')
    if type == '' or type == None:
        type = 2
    else :
        type = int(type)

    if search == None:
        search = ''

    if page == None:
        page = 1
    else :
        page = int(page)
    teacher = User.objects.get(pk=id)
    courseList = Courses.objects.filter(user_id=id)
    courseListTmp = []
    for course in courseList:
        course.total_student = Student_register_courses.objects.filter(course_id_id=course.id).count()
        course.spam = Spam.objects.filter(teacher_id=id, course_id=course.id).count()
        if search in course.name and course.approval_status == 2:
            if type == 2:
                courseListTmp.append(course)
            else:
                if course.type == type:
                    courseListTmp.append(course)

    paginator = Paginator(courseListTmp, settings.DEFAULT_PAGESIZE)
    try:
        courses = paginator.page(page)
    except PageNotAnInteger:
        courses = paginator.page(1)
    except EmptyPage:
        courses = paginator.page(paginator.num_pages)
    return render(request, 'single_teacher.html', {'teacher': teacher, 'courses': courses, 'page': page, 'type': type, 'search': search})


def single_student(request):
    id = request.GET.get('id')
    page = request.POST.get('page')
    search = request.POST.get('search')
    type = request.POST.get('type')

    if type == '' or type == None:
        type = 2
    else :
        type = int(type)

    if search == None:
        search = ''

    if page == None:
        page = 1
    else :
        page = int(page)

    student = User.objects.get(pk=id)
    courseList = Student_register_courses.objects.filter(student_id_id=id)
    courseListTmp = []
    for course in courseList:
        ele = Courses.objects.get(pk=course.course_id_id)
        ele.purchase_date = course.date_created
        if ele.approval_status == 2 and search in ele.name:
            if type == 2:
                courseListTmp.append(ele)
            else:
                if ele.type == type:
                    courseListTmp.append(ele)

    paginator = Paginator(courseListTmp, settings.DEFAULT_PAGESIZE)
    try:
        courses = paginator.page(page)
    except PageNotAnInteger:
        courses = paginator.page(1)
    except EmptyPage:
        courses = paginator.page(paginator.num_pages)

    for course in courses:
        key = str(id) + "-" + str(course.id)
        if Cache.objects.filter(key=key).exists():
            video_cache = Cache.objects.filter(key=key)[0]
            history = json.loads(video_cache.cache_str)
            check_cnt = sum(history['checkList'])
            total_cnt = len(history['checkList'])
            check_box = str(check_cnt) + " - " + str(total_cnt)
        else:
            sec_list = Sections.objects.filter(course_id=course.id).values_list('id',flat=True)
            sec_list = map(str, sec_list)
            sec_list_id = ','.join(sec_list)
            total_cnt = VideoUploads.objects.extra(where=['find_in_set(section_id, "'+ sec_list_id +'")']).count()
            check_box = "0 - " + str(total_cnt)
        course.check_box = check_box

    return render(request, 'single_student.html', {'student': student, 'courses': courses, 'page': page, 'search': search, 'type': type})


# authentication part::
@csrf_exempt
def postlogin(request):
    data = request.POST
    email = data.get('email')
    password = data.get('password')
    keep_me_login = data.get('keep_me_login')
    status = 2
    auth_res = authenticate(email=email, password=password)
    if Admin.objects.filter(email=email).exists() == 0:
        status = 1
    if status != 1 and auth_res == None:
        status = 2
    if auth_res is not None:
        status = 0
        login(request, auth_res)
        user = Admin.objects.get(email=email)
        user_id = user.id
        role = user.role
        request.session['user_id'] = user_id
        request.session['password'] = password
        if int(role) == 0:  # super admin
            request.session['user_type'] = 'super_admin'
        elif int(role) == 1:  # super user
            request.session['user_type'] = 'super_user'
        else:  # employee
            request.session['user_type'] = 'employee'
        #now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        #logtime = Logtime(
        #    user_id=request.user.id,
        #    in_time=now
        #)
        #logtime.save()
        ret = {
            'status': status
        }
    else:
        ret = {
            'status': status
        }
    return JsonResponse(ret)

def signout(request):
    #logtimeList = Logtime.objects.filter(user_id=request.user.id).order_by('-in_time')[:1]
    #logtime = logtimeList[0]
    #now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    #logtime.out_time = now
    #logtime.save()
    logout(request)
    return HttpResponseRedirect('/')

# handling api request...
@csrf_exempt
def getCourseById(request):
    course_id = request.POST.get('course_id')
    print("course_id", course_id)
    course = Courses.objects.get(pk=course_id)
    # course.username = course.user.first_name + ' ' + course.user.last_name
    user = User.objects.get(pk=course.user_id)
    course_list = serializers.serialize('json', [course])
    ret = {
        'name': user.first_name + ' ' + user.last_name,
        'course': course_list
    }
    return JsonResponse(ret, safe=False)


@csrf_exempt
def getTestVideoById(request):
    id = request.POST.get('id')
    user_id = request.POST.get('user_id')
    video = TestVideo.objects.get(pk=id)
    user = User.objects.get(pk=user_id)
    ret = {
        'user': serializers.serialize('json', [user]),
        'video': serializers.serialize('json', [video])
    }
    return JsonResponse(ret, safe=False)


@csrf_exempt
def deleteVideoById(request):
    id = request.POST.get('id')
    TestVideo.objects.get(pk=id).delete()
    ret = {
        'msg': 'success'
    }
    return JsonResponse(ret)


@csrf_exempt
def setApprove(request):
    # try:
    #     course_id = request.POST.get('course_id')
    #     course = Courses.objects.get(pk=course_id)
    #     html = render_to_string('mail/course_mail.html', {'course': course})
    #     print("html test:::\n", html)
    #     send_mail('','','',['ernestpapyan96@gmail.com'],fail_silently=False,html_message=html)
    # except:
    #     exit()

    course_id = request.POST.get('course_id')
    course = Courses.objects.get(pk=course_id)
    course.approval_status = 2
    course.save()
    ret = {
        'msg': 'success'
    }
    return JsonResponse(ret)


@csrf_exempt
def setCancel(request):
    course_id = request.POST.get('course_id')
    course = Courses.objects.get(pk=course_id)
    course.approval_status = 3
    course.save()
    ret = {
        'msg': 'success'
    }
    return JsonResponse(ret)


@csrf_exempt
def updateProfile(request):
    data = request.POST
    files = request.FILES
    id = data.get('id')
    user = Admin.objects.get(pk=id)
    msg = ''
    try:
        if files.get('img') != None:
            myfile = files['img']
            filename = myfile._get_name()
            ext = filename[filename.rfind('.'):]
            file_name = str(uuid.uuid4()) + ext
            path = '/img/user_images/'
            full_path = str(path) + str(file_name)
            user.img = full_path
            print('%s%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)))
            fd = open('%s%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')

            for chunk in myfile.chunks():
                fd.write(chunk)
            fd.close()

        user.name = data.get('name')
        user.address = data.get('address')
        user.email = data.get('email')
        if data.get('password') != '':
            user.set_password(data.get('password'))
        user.save()
        msg = 'success'
    except:
        msg = 'error'
    ret = {
        'msg': msg,
        'id': user.id
    }
    return JsonResponse(ret)


@csrf_exempt
def addEmployee(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    position = request.POST.get('position')
    address = request.POST.get('address')
    password = settings.DEFAULT_PASSWORD
    now = datetime.datetime.now()
    last_login = now.strftime("%Y-%m-%d %H:%M:%S")
    date_join = now.strftime("%Y-%m-%d %H:%M:%S")

    # test the same email is exist
    status = 0
    if Admin.objects.filter(email=email).exists() == 0:
        try:
            employee = Admin(
                email=email,
                name=name,
                position_id=position,
                address=address,
                role=2,
                last_login=last_login,
                date_joined=date_join
            )
            employee.set_password(password)
            employee.save()
        except:
            status = 2
    else:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def editMember(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    email = request.POST.get('email')
    position = request.POST.get('position')
    # test the same email is exist
    status = 0
    try:
        member = Admin.objects.get(pk=id)
        member.name = name
        member.email = email
        member.position_id = position
        member.save()
    except:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteMember(request):
    id = request.POST.get('id')
    status = 0
    try:
        Admin.objects.get(pk=id).delete()
    except:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def addPosition(request):
    name = request.POST.get('name')
    try:
        exist = Position.objects.filter(name=name)
        if len(exist) > 0:
            msg = 'error'
            value = 2  # this position aleady exist
        else:
            obj = Position(
                name=name,
                comment=''
            )
            obj.save()
            msg = 'success'
            value = 0
    except:
        msg = 'error'
        value = 1
    ret = {
        'msg': msg,
        'value': value
    }
    return JsonResponse(ret)

@csrf_exempt
def addSuperUser(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    position = request.POST.get('position')
    address = request.POST.get('address')
    password = settings.DEFAULT_PASSWORD
    now = datetime.datetime.now()
    last_login = now.strftime("%Y-%m-%d %H:%M:%S")

    # test the same email is exist
    status = 0
    if Admin.objects.filter(email=email).exists() == 0:
        try:
            superuser = Admin(
                email=email,
                name=name,
                position_id=position,
                address=address,
                role=1,
                last_login=last_login
            )
            superuser.set_password(password)
            superuser.save()
        except:
            status = 2
    else:
        status = 1
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def getSubCategories(request):
    id = request.POST.get('id')
    categories = Subcategories.objects.filter(categories_id=id)
    return JsonResponse({
        'sub_categories': serializers.serialize('json', categories)
    })

@csrf_exempt
def saveCourse(request):
    data = request.POST
    id = data.get('id')
    name = data.get('course_name')
    category = data.get('category')
    sub_category = data.get('sub_category')
    price = data.get('price')
    course_level = data.get('course_level')
    dripping = data.get('dripping')
    course = Courses.objects.get(pk=id)
    status = 1
    try:
        course.name = name
        course.scat_id = category
        course.subcat_id = sub_category
        course.price = price
        course.course_level = course_level
        course.dripping = dripping
        course.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteCourse(request):
    id = request.POST.get('id')
    status = 1
    try:
        Courses.objects.get(pk=id).delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)
