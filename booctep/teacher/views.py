from django.shortcuts import render, redirect
from teacher.models import categories, Courses, VideoUploads, Sections, questions, TestVideo, student_mark, answers, subcategories
from home.models import User, user_profile, notifications, Admincontrol, Messages, Card
from student.models import student_register_courses, course_comments
from discount.models import *
from datetime import datetime
import os, sys, shutil
import traceback
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
import uuid
import json
from django.core import serializers
from django.conf import settings
from django.db.models import Q
from django.utils.translation import LANGUAGE_SESSION_KEY
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def getRatingFunc(rating_list):
    sum = 0
    count = 0
    for rate in rating_list:
        sum += rate.rating
        count += 1
    if count == 0:
        _rating = 0
    else:
        _rating = sum / count
    return round(_rating, 1)

def teacher_account(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    objC = categories.objects.all()
    sub_categories = subcategories.objects.all()
    profile = ''
    if user_profile.objects.filter(user_id=request.user.id).exists():
        profile = user_profile.objects.get(user_id=request.user.id)

    return render(request, 'teacher/account.html', {'objC': objC, 'profile': profile, 'sub_categories': sub_categories, 'lang': getLanguage(request)[0]})


def teacher_security(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user_id = request.session.get('user_id')
    password = request.session.get('password')
    return render(request, 'teacher/security.html',
                  {'lang': getLanguage(request)[0], 'user_id': user_id, 'password': password})


def teacher_notifications1(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    id = request.user.id
    noti_list = notifications.objects.filter(user_id=id)
    course_list = Courses.objects.filter(user_id=id)
    course_id = Courses.objects.filter(user_id=id).values_list('id', flat=True)
    ids = map(str, course_id)
    _ids = ','.join(ids)

    excludetheseid = []
    exclude_student_unrecieve_noti = User.objects.filter(receive_notifications=0).values('id')

    for value in range(len(exclude_student_unrecieve_noti)):
        excludetheseid.append(exclude_student_unrecieve_noti[value]['id'])

    student_list = student_register_courses.objects.extra(where=['FIND_IN_SET(course_id_id, "' + _ids + '")']).exclude(
        student_id_id__in=excludetheseid)

    print(excludetheseid)
    # print("stude:", student_list)
    return render(request, 'teacher/notifications.html',
                  {'lang': getLanguage(request)[0], 'noti_list': noti_list, 'course_list': course_list,
                   'student_list': student_list})

def teacher_notifications(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    id = request.user.id
    id_list = notifications.objects.filter(Q(sender_id=id) & Q(type=0)).values('course_id').distinct()
    total_noti_list = []
    for ele in id_list:
        if notifications.objects.filter(Q(sender_id=id) & Q(type=0) & Q(course_id=ele['course_id'])).exists():
            time_list = notifications.objects.filter(Q(sender_id=id) & Q(type=0) & Q(course_id=ele['course_id'])).values('created_at').distinct()
            for time in time_list:
                noti = notifications.objects.filter(Q(sender_id=id) & Q(type=0) & Q(course_id=ele['course_id']) & Q(created_at=time['created_at']))[0]
                course = Courses.objects.get(pk=noti.course_id)
                noti.course_name = course.name
                total_noti_list.append(noti)
    noti_list1 = notifications.objects.filter(Q(user_id=id) & Q(type=1))

    total_course_list = []
    course_list = Courses.objects.filter(user_id=id)
    for course in course_list:
        if student_register_courses.objects.filter(course_id_id=course.id).exists():
            total_course_list.append(course)
    for noti in noti_list1:
        noti.course_name = "-"
        total_noti_list.append(noti)

    return render(request, 'teacher/notifications.html',
                  {'lang': getLanguage(request)[0], 'noti_list': total_noti_list, 'course_list': total_course_list})

def teacher_payments(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/payments.html', {'lang': getLanguage(request)[0]})


def teacher_privacy(request):
    user = User.objects.get(pk=request.user.id)
    return render(request, 'teacher/privacy.html', {'lang': getLanguage(request)[0], 'user': user})


def dashboard(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user_id = request.session.get('user_id')
    courses = Courses.objects.filter(user_id=user_id).filter(type=0)

    # price logic..
    totalPrice = 0

    #get total student for free course
    free_course_list = Courses.objects.filter(user_id=user_id, type=1).values_list('id', flat=True)
    free_course_list = map(str, free_course_list)
    free_course_id_str = ','.join(free_course_list)
    totalFreeStuCnt = student_register_courses.objects.extra(where=['find_in_set(course_id_id, "'+ free_course_id_str +'")']).count()

    #get total student for paid course
    paid_course_list = Courses.objects.filter(user_id=user_id, type=0).values_list('id', flat=True)
    paid_course_list = map(str, paid_course_list)
    paid_course_id_str = ','.join(paid_course_list)
    totalPaidStuCnt = student_register_courses.objects.extra(where=['find_in_set(course_id_id, "' + paid_course_id_str + '")']).count()

    #get total rating of the courses
    course_list = Courses.objects.filter(user_id=user_id)
    sum = 0
    cnt = 0
    for course in course_list:
        rating_list = course_comments.objects.filter(course_id_id=course.id)
        sum += getRatingFunc(rating_list)
        if len(rating_list) > 0:
            cnt += 1
    if cnt is 0:
        total_rating = 0
    else:
        total_rating = round(sum / cnt, 1)

    #get total revenue
    total_revenue = 0
    course_list = Courses.objects.filter(user_id=user_id, type=0)
    total_hold_money = 0
    total_transfer_money = 0

    nowtime = datetime.now()

    for course in course_list:
        price = 0
        stu_num = student_register_courses.objects.filter(course_id_id=course.id).count()
        price = course.price * stu_num
        total_revenue += price
        pending_list = student_register_courses.objects.filter(course_id_id=course.id).filter(withdraw=0)
        hold_money = 0
        ready_money = 0
        transfer_money = 0
        for ele in pending_list:
            time = ele.date_created
            time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
            interval = (nowtime - time).days
            if interval >= 30:
                ele.withdraw = 1
                ele.save()
                hold_money += ele.course_id.price
        hold_list = student_register_courses.objects.filter(course_id_id=course.id).filter(withdraw=1)
        for ele in hold_list:
            hold_money += ele.course_id.price
        ready_list = student_register_courses.objects.filter(course_id_id=course.id).filter(withdraw=2)
        for ele in ready_list:
            ready_money += ele.course_id.price
        transfer_list = student_register_courses.objects.filter(course_id_id=course.id).filter(withdraw=3)
        for ele in transfer_list:
            transfer_money += ele.course_id.price
        course.hold_money = hold_money
        course.ready_money = ready_money
        course.transfer_money = transfer_money
        course.refund_money = 0
        total_hold_money += hold_money
        total_transfer_money += transfer_money

    teacher_tax = Admincontrol.objects.get(pk=1).teacher_tax

    # # get total rating
    # rateSum = 0
    # rateCnt = 0
    # for course in courses:
    #     rating = course_comments.objects.filter(course_id_id=course.id).values_list('rating', flat=True)
    #     rating = list(rating)
    #     sum = 0
    #     for i in rating:
    #         sum += i
    #     if len(rating) == 0:
    #         course.rating = 0
    #     else:
    #         course.rating = sum / len(rating)
    #     course.stuCnt = student_register_courses.objects.filter(course_id_id=course.id).count()
    #     course.totalGain = course.price * course.stuCnt
    #     totalPrice += course.totalGain
    #     rateSum += course.rating
    #     rateCnt += 1
    # if rateCnt == 0:
    #     totalRate = 0
    # else:
    #     totalRate = round(rateSum / rateCnt, 2)
    return render(request, 'teacher/dashboard.html',
                  {'lang': getLanguage(request)[0], 'courses': course_list, 'total_rating': total_rating, 'total_revenue': total_revenue,
                   'totalFreeStuCnt': totalFreeStuCnt, 'totalPaidStuCnt': totalPaidStuCnt, 'totalPrice': totalPrice, 'teacher_tax': teacher_tax,
                   'total_hold_money': total_hold_money, 'total_transfer_money': total_transfer_money})


def teacher_courses(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    filter_type = request.GET.get('filter_type')
    if filter_type == None:
        filter_type = '-1'
    if int(filter_type) == -1:
        course_list = get_teacher_CourseList(request)
        filter_type = -1
    else:
        user_id = request.session.get("user_id")
        course_list = Courses.objects.filter(user_id=user_id, type=filter_type).filter(approval_status=2)
        filter_type = int(filter_type)
    for course in course_list:
        course.progress = course.pending * 100 / 4
        print("progress:::", course.progress)

    return render(request, 'teacher/courses.html', {'lang': getLanguage(request)[0], 'course_list': course_list,
                                                    'user_type': request.session.get('user_type'),
                                                    'filter_type': filter_type})


def teacher_faqs(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/faqs.html', {'lang': getLanguage(request)[0]})


def course_engagement(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    cur_course_id = request.POST.get('course_id')
    courses = get_teacher_CourseList(request)
    page = request.POST.get('page')
    if page == None or page == '':
        page = 1
    else:
        page = int(page)
    if cur_course_id == None:
        if len(courses) > 0:
            cur_course_id = courses[0].id
        else:
            cur_course_id = 0
    else:
        cur_course_id = int(cur_course_id)
    if len(courses) > 0:
        course = Courses.objects.get(pk=cur_course_id)
        # total students
        count = student_register_courses.objects.filter(course_id_id=course.id).count()
        course.stuCnt = count
        # total rating
        rateList = course_comments.objects.filter(course_id_id=course.id).values_list('rating', flat=True)
        rateList = list(rateList)
        sum = 0
        for i in rateList:
            sum += i
        if len(rateList) == 0:
            course.rating = 0
        else:
            course.rating = sum / len(rateList)
        # reviews...
        reviewList = course_comments.objects.filter(course_id_id=cur_course_id)
        paginator = Paginator(reviewList, 4)
        try:
            reviewList = paginator.page(page)
        except PageNotAnInteger:
            reviewList = paginator.page(1)
        except EmptyPage:
            reviewList = paginator.page(reviewList.num_pages)
        if discount.objects.filter(course_id=cur_course_id).exists():
            coupon = discount.objects.filter(course_id=cur_course_id)[0]
        else:
            coupon = ''

    else:
        course = ''
        reviewList = ''
    return render(request, 'teacher/course-engagement.html',
                  {'lang': getLanguage(request)[0], 'courses': courses, 'course': course, 'reviewList': reviewList,
                   'cur_course_id': cur_course_id, 'page': page, 'coupon': coupon })

def transactions(request):
    return render(request, 'teacher/transactions.html', {})


def payout(request):
    user_id = request.user.id
    card = []
    if Card.objects.filter(user_id=user_id).exists():
        card = Card.objects.get(user_id=user_id)
    return render(request, 'teacher/payout.html', {'card': card})


def addtofeedback(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    commentid = request.GET.get('commentid')
    commentquery = course_comments.objects.filter(course_id_id=commentid)
    commentquery.approved_by_teacher = 1
    commentquery.save()
    return HttpResponse("success")


def student_performance(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user_id = request.user.id
    course_id = request.POST.get('course_id')
    courseList = Courses.objects.filter(user_id=user_id).order_by("id")
    if len(courseList) > 0:
        if course_id == None:
            course_id = courseList[0].id
        # get all course that i made..
        studentList = student_mark.objects.filter(course_id=course_id)
        for student in studentList:
            student.user = User.objects.get(pk=student.student_id)
            student.percent = student.mark * 20
            student.count = answers.objects.filter(student_id=student.student_id, result=1).count()

    else:
        course_id = ''
    return render(request, 'teacher/student-performance.html',
                  {'lang': getLanguage(request)[0], 'courseList': courseList, 'course_id': course_id * 1,
                   'studentList': studentList})


def teacher_messages(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user_id = request.session.get("user_id")
    user_type = request.session.get("user_type")
    if user_id:
        profile = User.objects.get(id=user_id)

        user_name = profile.first_name + " " + profile.last_name

    student_list = []
    student_dict = {}

    if Courses.objects.filter(user_id=user_id).exists():
        obj = Courses.objects.filter(user_id=user_id)
        courseList = Messages.objects.filter(receiver_id=user_id).values('course_id').distinct()
        for i in courseList:
            print("ets:::", i['course_id'])
            course = Courses.objects.get(pk=i['course_id'])
            userList = Messages.objects.filter(receiver_id=user_id, course_id=i['course_id']).filter(delete_id=0).values(
                'sender_id').distinct()
            for ele in userList:
                unread = Messages.objects.filter(receiver_id=user_id, sender_id=ele['sender_id'], course_id=i['course_id'], is_read=0)
                user = User.objects.get(pk=ele['sender_id'])
                student_dict['course_name'] = course.name
                student_dict['course_id'] = course.id
                student_dict['student_id'] = user.id
                student_dict['student_name'] = user.first_name + " " + user.last_name
                student_dict['student_image'] = user.image
                if len(unread) == 0:
                    student_dict['unread'] = 0
                else:
                    student_dict['unread'] = 1
                student_list.append(student_dict)
                student_dict = {}

        # for i in obj:
        # 	if student_register_courses.objects.filter(course_id = i.id).exists():
        # 		student_obj = student_register_courses.objects.filter(course_id = i.id)
        # 		for k in student_obj:
        # 			student_dict["course_name"] = i.name
        # 			student_dict["course_id"] = i.id
        # 			student_dict["student_id"] = k.student_id.id
        # 			student_dict["student_name"] = k.student_id.first_name+" "+k.student_id.last_name
        # 			student_dict["student_image"] = k.student_id.image
        # 			student_list.append(student_dict)
        # 			student_dict = {}
        print("teacher list:::", student_list)
        return render(request, 'teacher/messages.html',
                      {'lang': getLanguage(request)[0], 'datetime': datetime, "studentList": student_list,
                       "user_id": user_id, "user_name": user_name})
    else:
        return render(request, 'teacher/messages.html',
                      {'lang': getLanguage(request)[0], 'datetime': datetime, "user_id": user_id})


def dashboard1(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/dashboard_1.html', {'lang': getLanguage(request)[0]})


def guideline(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/guidline.html', {'lang': getLanguage(request)[0]})


def teacher_help(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/help.html', {'lang': getLanguage(request)[0]})


def help2(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/help2.html', {'lang': getLanguage(request)[0]})


def add_course(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    step = int(request.GET.get('step'))

    if step == 1:
        course = []
        obj_cat = categories.objects.all()
        autoUrl = ''
        if request.method == 'POST':
            course_id = request.POST.get('course')
            course = Courses.objects.get(pk=course_id)
        else:
            course_id = ''

        courseCnt = Courses.objects.filter(user_id=request.user.id).count()
        teacher_name = request.user.first_name + " " + request.user.last_name
        courseNo = ''
        idx = (courseCnt + 1)
        while idx < 1000:
            idx = idx * 10
            courseNo += '0'
        if course != []:
            if course.description == '\n':
                course.description = ''
            if course.requirements == '\n':
                course.requirements = ''
            if course.gains == '\n':
                course.gains = ''

        # autoUrl = teacher_name + "_" + courseNo + str(courseCnt + 1)
        return render(request, 'teacher/new-course.html',
                      {'lang': getLanguage(request)[0], 'categories': obj_cat, 'autoUrl': autoUrl, 'course': course,
                       'course_id': course_id})

    elif step == 2:
        if request.method == 'POST':
            course_id = request.POST.get('course')
            if course_id != '':
                course = Courses.objects.get(pk=course_id)
                sections = Sections.objects.filter(course_id=course_id).filter(type='video')
                videos = []
                section_video = []
                key = 1
                video_key = 0
                for section in sections:
                    video_res = VideoUploads.objects.filter(section_id=section.id)
                    videos += video_res
            else:
                course_id = ''
                course = []
                sections = []
                videos = []
        else:
            course_id = ''
            course = []
            sections = []
            videos = []

        print("sections:", sections)
        print("videos:", videos)
        return render(request, 'teacher/new-course-2.html',
                      {'lang': getLanguage(request)[0], 'course_id': course_id, 'course': course,
                       'sections': serializers.serialize('json', sections),
                       'videos': serializers.serialize('json', videos)})

    elif step == 3:
        if request.method == 'POST':
            course_id = request.POST.get('course')
            course = Courses.objects.get(pk=course_id)
            if Sections.objects.filter(course_id=course_id).filter(type='question').exists():
                section = Sections.objects.filter(course_id=course_id).filter(type='question')[0]
                question = questions.objects.filter(section_id=section.id)
            else:
                section = ''
                question = ''
        else:
            course_id = ''
            section = []
            question = []
        return render(request, 'teacher/new-course-3.html',
                      {'lang': getLanguage(request)[0], 'course_id': course_id, 'section': section, 'course': course,
                       'question_list': serializers.serialize('json', question)})
    else:
        course_id = request.POST.get('course')
        data = get_courseDetails(course_id)
        course = Courses.objects.get(pk=course_id)
        url_id = "{0:0=4d}".format(course.id)
        url = '/course/' + course.name + '/' + request.user.first_name + '_' + request.user.last_name + '_' + url_id
        course.course_url = url
        course.save()
        return render(request, 'teacher/new-course-4.html',
                      {'course_id': course_id, 'video_list': data['video_list'], 'question_list': data['question_list'],
                       'section_list': data['section_list'], 'course': course, 'promo_video': data['promo_video']})


def test_video(request):
    return render(request, 'teacher/test_video.html')


def save_testvideo(request):
    data = request.POST
    user_id = data.get('user')
    file = request.FILES
    print("rsult::", file.get('video'))
    print("files", file)
    if file.get('video') != None:
        video = file['video']
        filename = video._get_name()
        ext = filename[filename.rfind('.'):]
        file_name = str(uuid.uuid4()) + ext
        path = '/uploads/courses/videos/'
        full_path = str(path) + str(file_name)
        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')

        for chunk in video.chunks():
            fd.write(chunk)
        fd.close()

        ## store video in DB
        objVideo = TestVideo(
            name=filename,
            url=full_path,
            user_id=user_id,
            review=0
        )
        objVideo.save()
        ret = {
            'msg': 'success',
            'id': objVideo.id
        }
    else:
        ret = {
            'msg': 'error',
            'id': ''
        }
    return JsonResponse(ret)


# def courseUrlGenerator(coursename):
# 	x = txt.split()
#     courselink = "_".join(x)
#     return courselink

#
def newcourse(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    course = []
    obj_cat = categories.objects.all()
    autoUrl = ''
    if request.method == 'POST':
        course_id = request.POST.get('course')
        course = Courses.objects.get(pk=course_id)
        descript = course.includes.split(",")
        descript.pop()
        course.includes = descript
    else:
        course_id = ''
    courseCnt = Courses.objects.filter(user_id=request.user.id).count()
    teacher_name = request.user.first_name + " " + request.user.last_name
    courseNo = ''
    idx = (courseCnt + 1)
    while idx < 1000:
        idx = idx * 10
        courseNo += '0'
    autoUrl = teacher_name + "_" + courseNo + str(courseCnt + 1)

    return render(request, 'teacher/new-course.html',
                  {'lang': getLanguage(request)[0], 'categories': obj_cat, 'autoUrl': autoUrl, 'course': course,
                   'course_id': course_id})


def nocourseengagement(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/no-course-engagement.html', {'lang': getLanguage(request)[0]})


def nocourse(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'teacher/no-course.html', {'lang': getLanguage(request)[0]})

def get_teacher_CourseList(request):
    user_id = request.session.get("user_id")
    course_list = Courses.objects.filter(user_id=user_id).filter(approval_status=2)
    return course_list

def getAllCourseList():
    course_list = Courses.objects.filter(approval_status=2)
    return course_list

def getPaidCourseList():
    course_list = Courses.objects.filter(type=0, approval_status=2)
    return course_list

def getFreeCourseList():
    course_list = Courses.objects.filter(type=1, approval_status=2)
    return course_list

# store course in DB
def store_course(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    description = request.POST.get('description')
    requirements = request.POST.get('requirements')
    gains = request.POST.get('gains')
    category_id = request.POST.get('category_id')
    sub_category_id = request.POST.get('sub_category_id')
    price = request.POST.get('price')
    courseUrl = request.POST.get('courseUrl')
    user_id = request.POST.get('user_id')
    pending = request.POST.get('pending')
    type = request.POST.get('type')
    course_level = request.POST.get('course_level')
    dripping = request.POST.get('dripping')

    user_name = request.user.first_name + " " + request.user.last_name

    full_path = ''
    full_path1 = ''
    if request.FILES.get('coverImg') != None:
        myfile = request.FILES['coverImg']

        filename = myfile._get_name()

        ext = filename[filename.rfind('.'):]
        file_name = str(uuid.uuid4()) + ext
        path = '/user_images/'
        full_path = str(path) + str(file_name)
        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')
        for chunk in myfile.chunks():
            fd.write(chunk)
        fd.close()
    if request.FILES.get('headerImg') != None:
        myfile1 = request.FILES['headerImg']
        filename1 = myfile1._get_name()
        ext1 = filename1[filename1.rfind('.'):]
        file_name1 = str(uuid.uuid4()) + ext1
        path = '/user_images/'
        full_path1 = str(path) + str(file_name1)

        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name1)), 'wb')
        for chunk in myfile1.chunks():
            fd.write(chunk)
        fd.close()
    nameList = name.split(" ")
    courseUrl = '_'.join(nameList)

    if id == '':  # add case
        objCourse = Courses(
            name=name,
            description=description,
            requirements=requirements,
            gains=gains,
            scat_id=category_id,
            price=price,
            user_id=request.user.id,
            user_name=user_name,
            cover_img=full_path,
            header_img=full_path1,
            course_url=courseUrl,
            pending=pending,
            type=type,
            course_level=course_level,
            dripping=dripping,
            approval_status=0
        )
        objCourse.save()
        print('success')
        msg = "successs"
        id = objCourse.id
    else:
        objCourse = Courses.objects.get(pk=id)
        objCourse.name = name
        objCourse.description = description
        objCourse.requirements = requirements
        objCourse.gains = gains
        objCourse.scat_id = category_id
        objCourse.price = price
        objCourse.user_id = request.user.id
        objCourse.user_name = user_name
        if full_path != '':
            objCourse.cover_img = full_path
        if full_path1 != '':
            objCourse.header_img = full_path1
        objCourse.course_url = courseUrl
        objCourse.pending = pending
        objCourse.type = type
        objCourse.course_level = course_level
        objCourse.dripping = dripping
        objCourse.save()
        msg = "successs"
        id = objCourse.id

    to_return = {
        'msg': msg,
        'id': id}
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


def save_later(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    description = request.POST.get('description')
    requirements = request.POST.get('requirements')
    gains = request.POST.get('gains')
    category_id = request.POST.get('category_id')
    sub_category_id = request.POST.get('sub_category_id')
    price = request.POST.get('price')
    courseUrl = request.POST.get('courseUrl')
    user_id = request.POST.get('user_id')
    pending = request.POST.get('pending')
    type = request.POST.get('type')
    course_level = request.POST.get('course_level')
    dripping = request.POST.get('dripping')

    coverImg = request.FILES.get('coverImg')
    headerImg = request.FILES.get('headerImg')
    full_path = ''
    full_path1 = ''
    if coverImg != None:
        myfile = request.FILES['coverImg']
        filename = myfile._get_name()

        ext = filename[filename.rfind('.'):]
        file_name = str(uuid.uuid4()) + ext
        path = '/user_images/'
        full_path = str(path) + str(file_name)
        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')
        for chunk in myfile.chunks():
            fd.write(chunk)
        fd.close()

    if headerImg != None:
        myfile1 = request.FILES['headerImg']

        filename1 = myfile1._get_name()
        ext1 = filename1[filename1.rfind('.'):]
        file_name1 = str(uuid.uuid4()) + ext1
        path = '/user_images/'
        full_path1 = str(path) + str(file_name1)

        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name1)), 'wb')
        for chunk in myfile1.chunks():
            fd.write(chunk)
        fd.close()

    if id == '':  # add case
        objCourse = Courses(
            name=name,
            description=description,
            requirements=requirements,
            gains=gains,
            scat_id=category_id,
            price=price,
            user_id=request.user.id,
            cover_img=full_path,
            header_img=full_path1,
            course_url=courseUrl,
            pending=pending,
            type=type,
            course_level=course_level,
            dripping=dripping,
            approval_status=0
        )
        objCourse.save()
        print('success')
        msg = "successs"
        id = objCourse.id
    else:
        objCourse = Courses.objects.get(pk=id)
        objCourse.name = name
        objCourse.description = description
        objCourse.requirements = requirements
        objCourse.gains = gains
        objCourse.scat_id = category_id
        objCourse.price = price
        objCourse.user_id = request.user.id
        objCourse.cover_img = full_path
        objCourse.header_img = full_path1
        objCourse.course_url = courseUrl
        objCourse.pending = pending
        objCourse.type = type
        objCourse.course_level = course_level
        objCourse.dripping = dripping
        objCourse.save()
        msg = "successs"
        id = objCourse.id

    to_return = {
        # 'msg': msg,
        'msg': 'msg',
        'id': id}
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


# store videos in DB
def store_course_2(request):
    data = request.POST
    course_id = json.loads(data.get("course_id"))
    pending = json.loads(data.get("pending"))
    files = request.FILES
    video_list = []
    msg = ''

    course = Courses.objects.get(pk=course_id)
    course.pending = pending
    course.save()

    try:
        section_list = data.get("section_list")
        section_list = json.loads(section_list)
        json_video_list = json.loads(data.get("video_list"))

        if (len(json_video_list) > 0):
            ## store section in DB
            for section in section_list:
                print("section:::", section['id'])
                name = section['name']
                tag_id = section['tag_id']

                ## store section in DB

                # check if section already exist
                length = len(section_list)
                Sections.objects.filter(course_id=course_id).filter(nos__gt=length).delete()
                sections = Sections.objects.filter(course_id=course_id)

                if section['id'] != '':
                    ele = Sections.objects.get(pk=section['id'])
                    ele.nos = section['tag_id']
                    ele.name = section['name']
                    ele.save()
                    section_id = section['id']
                    print(" section id is no null case:", section_id)

                else:
                    objSection = Sections(
                        name=section['name'],
                        course_id=course_id,
                        type='video',
                        nos=section['tag_id']
                    )
                    objSection.save()
                    section_id = objSection.id
                    print(" section id is null case:", section_id)

                # flag = False
                # for ele in sections:
                # 	if int(ele.nos) == int(tag_id):
                # 		ele.name = name
                # 		ele.nos = tag_id
                # 		section_id = ele.id
                # 		ele.save()
                # 		flag = True;
                #
                # if flag == False:
                # 	objSection = Sections(
                # 		name=name,
                # 		course_id=course_id,
                # 		type='video',
                # 		nos=tag_id
                # 	)
                # 	objSection.save()
                # 	section_id = objSection.id

                idstr = ''
                idList = []

                for item in json_video_list:
                    print("test::", item['sectionId'], "-----", tag_id)
                    if (int(item['sectionId']) == int(tag_id)):
                        video_key = item['key']
                        if files.get(video_key) == None:
                            id = item['id']
                            idList.append(id)

                prevVideos = VideoUploads.objects.filter(section_id=section_id)
                for ele in prevVideos:
                    if ele.id not in idList:
                        print("deleted:::", ele)
                        print("happy2")
                        ele.delete()

                for item in json_video_list:
                    print("compare::", item['sectionId'])
                    print("compare::", tag_id)
                    if (int(item['sectionId']) == int(tag_id)):
                        ## upload video
                        video_key = item['key']
                        print("file exist::", files.get(video_key))
                        if files.get(video_key) == None:
                            continue;
                        else:
                            video = files[video_key]
                            filename = video._get_name()
                            ext = filename[filename.rfind('.'):]
                            file_name = str(uuid.uuid4()) + ext
                            path = '/uploads/courses/videos/'
                            full_path = str(path) + str(file_name)
                            print("store course", full_path)
                            print("store course1", (settings.STATICFILES_DIRS[0], str(path) + str(file_name)))
                            fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')

                            for chunk in video.chunks():
                                fd.write(chunk)
                            fd.close()

                            ## store video in DB
                            objVideo = VideoUploads(
                                name=filename,
                                section_id=section_id,
                                url=full_path,
                                promo=item['isPromo'],
                                duration=item['duration']
                            )
                            objVideo.save()

            msg = "success"
        else:
            msg = "failed"
    except:

        tb = sys.exc_info()[2]
        tbinfo = traceback.format_tb(tb)[0]
        msg = tbinfo + "\n" + ": " + str(sys.exc_info())
    to_return = {
        'msg': msg,
    }
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


def save_later_2(request):
    data = request.POST
    course_id = json.loads(data.get("course_id"))
    pending = json.loads(data.get("pending"))
    files = request.FILES
    video_list = []
    msg = ''

    course = Courses.objects.get(pk=course_id)
    course.pending = pending
    course.save()

    try:
        section_list = data.get("section_list")
        section_list = json.loads(section_list)
        json_video_list = json.loads(data.get("video_list"))
        if (len(json_video_list) > 0):
            for section in section_list:
                name = section['name']
                tag_id = section['tag_id']

                ## store section in DB
                objSection = Sections(
                    name=name,
                    course_id=course_id,
                    type='video',
                    nos=tag_id
                )
                objSection.save()
                section_id = objSection.id
                for item in json_video_list:
                    if (int(item['sectionId']) == int(tag_id)):
                        ## upload video
                        video_key = item['key']
                        video = files[video_key]
                        print("happy", video)
                        filename = video._get_name()
                        ext = filename[filename.rfind('.'):]
                        file_name = str(uuid.uuid4()) + ext
                        path = '/uploads/courses/videos/'
                        full_path = str(path) + str(file_name)
                        print("store course", full_path)
                        print("store course1", (settings.STATICFILES_DIRS[0], str(path) + str(file_name)))
                        fd = open('%s/%s' % (settings.STATICFILES_DIRS[0], str(path) + str(file_name)), 'wb')
                        for chunk in video.chunks():
                            fd.write(chunk)
                        fd.close()

                        ## store video in DB
                        objVideo = VideoUploads(
                            name=filename,
                            section_id=section_id,
                            url=full_path,
                            promo=item['promo'],
                            duration=item['duration']
                        )
                        objVideo.save()
            msg = "success"
        else:
            msg = "failed"
    except:

        tb = sys.exc_info()[2]
        tbinfo = traceback.format_tb(tb)[0]
        msg = tbinfo + "\n" + ": " + str(sys.exc_info())
    to_return = {
        'msg': msg,
    }
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


# store questions in DB
def store_course_3(request):
    msg = ''
    data = request.POST
    course_id = data.get("course_id")
    section_id = data.get("section_id")

    course = Courses.objects.get(pk=course_id)
    course.pending = 3
    course.save()

    print("course_id::", course_id)
    print("section_id::", section_id)
    try:
        question_list = json.loads(data.get('question_list'))
        print("question list::", question_list)
        if section_id == '':
            objSection = Sections(
                name="quiz section",
                course_id=course_id,
                type="question",
                nos=1,
            )
            objSection.save()
            section_id = objSection.id

        cnt = 1
        length = len(question_list)
        questions.objects.filter(section_id=section_id).filter(nos__gt=length).delete()
        for question in question_list:
            title = question['title']
            content = question['content']
            answer = question['answer']

            if questions.objects.filter(section_id=section_id).filter(nos=cnt).exists():
                ele = questions.objects.filter(section_id=section_id).filter(nos=cnt)[0]
                ele.title = title
                ele.content = content
                ele.answer = answer
                ele.save()
            else:
                ele = questions(
                    title=title,
                    section_id=section_id,
                    content=content,
                    answer=answer,
                    nos=cnt,
                )
                ele.save()
            cnt += 1
        msg = "success"
    except:
        tb = sys.exc_info()[2]
        tbinfo = traceback.format_tb(tb)[0]
        msg = tbinfo + "\n" + ": " + str(sys.exc_info())
    to_return = {
        'msg': msg,
    }
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


# get course details by course's id.
#
# @param Request
#
# @return HttpResponse

def store_course_4(request):
    course_id = request.POST.get('course_id')
    print("course_id::", course_id)
    course = Courses.objects.get(pk=course_id)
    course.approval_status = 1  # send request....
    course.pending = 4
    course.save()

    msg = 'success'
    to_return = {
        'msg': msg,
    }

    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


def getCourseDetailsById(request):
    id = request.POST.get('id')
    msg = ''
    to_return = {
        'msg': msg,
        'data': get_courseDetails(id)
    }
    serialized = json.dumps(to_return)
    return HttpResponse(serialized, content_type="application/json")


def get_courseDetails(course_id):
    id = course_id
    video_list = []
    question_list = []
    section_list = []
    promo_video = ''
    tmp_sections = Sections.objects.filter(course_id=id)

    if len(tmp_sections) > 0:
        for section in tmp_sections:
            section_list.append({
                'id': section.id,
                'name': section.name,
                'course_id': section.course_id,
                'type': section.type,
            })
            for video in VideoUploads.objects.filter(section_id=section.id):
                if video.promo == 1:
                    promo_video = video
                video_list.append({
                    'id': video.id,
                    'name': video.name,
                    'section_id': video.section_id,
                    'src': video.url,
                    'duration': video.duration,
                })
            for question in questions.objects.filter(section_id=section.id):
                question_list.append({
                    'id': question.id,
                    'title': question.title,
                    'section_id': question.section_id,
                    'nos': question.nos,
                    'content': question.content,
                    'answer': question.answer,
                })
    print(section_list)
    return {
        'question_list': question_list,
        'video_list': video_list,
        'section_list': section_list,
        'promo_video': promo_video
    }

ur = ""
def getLanguage(request):
    global ur;
    path = request.path
    ur = path
    prev = request.META.get('HTTP_REFERER')
    language = path.split('/')[1]
    if language == "ar":
        language = language + '/'
    else:
        language = ""
    return language, prev, path

def getVideoList(course):
    ssss = Sections.objects.filter(course_id=course.id).values_list("id", flat=True)
    ssss = map(str, ssss)
    strr = ','.join(ssss)
    videoList = VideoUploads.objects.extra(where=['FIND_IN_SET(section_id, "' + strr + '")'])
    return videoList
