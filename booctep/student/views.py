from django.shortcuts import render, redirect
from teacher.views import getLanguage
from teacher.models import *
from student.models import *
from video.models import *
from home.models import User, notifications, Messages
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from _datetime import datetime
import json

import codecs
from django.http import FileResponse, Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.db.models.functions import Concat
from django.db.models import F, Value, CharField


def account(request):
    if request.session.get('user_id') == None:
        # print(user_id)
        return redirect('/')
    return render(request, 'student/account.html', {'lang': getLanguage(request)[0]})


def courses(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user_id = request.session.get("user_id")
    user_type = request.session.get("user_type")
    filter_type = request.POST.get("type")
    page = request.POST.get("page")
    print("type::", filter_type)
    if filter_type == None or filter_type == '':
        filter_type = -1
    else:
        filter_type = int(filter_type)
    print("page::", page)

    if page == None or page == '':
        page = 1
    else:
        page = int(page)

    if user_type == "student":
        if int(filter_type) == -1:
            course_obj = student_register_courses.objects.filter(student_id=user_id)
            filter_type = -1
        else:
            course_obj = []
            courseIds = student_register_courses.objects.filter(student_id=user_id).values_list('course_id_id',
                                                                                                flat=True)
            courseIds = list(courseIds)
            courseIds = map(str, courseIds)
            courseStr = ','.join(courseIds)
            course_objTmp = Courses.objects.filter(type=filter_type).extra(
                where=['FIND_IN_SET(id, "' + courseStr + '")']).values_list('id', flat=True)
            realIds = list(course_objTmp)
            realIds = map(str, realIds)
            realStr = ','.join(realIds)
            course_obj = student_register_courses.objects.filter(student_id=user_id).extra(
                where=['FIND_IN_SET(course_id_id, "' + realStr + '")'])
        for course in course_obj:
            # rating_list = course_comments.objects.filter(course_id_id=course.course_id_id).values_list('rating', flat=True)
            # rating_list = list(rating_list)
            # sum = 0
            # cnt = len(rating_list)
            # for i in rating_list:
            #     sum += i
            # if cnt == 0:
            #     course.rating = 0
            # else:
            #     course.rating = sum / cnt
            if course_comments.objects.filter(course_id_id=course.course_id_id,user_id=request.user.id).exists():
                course.rating = course_comments.objects.filter(course_id_id=course.course_id_id,user_id=request.user.id)[0].rating
            else:
                course.rating = 0
            key = str(user_id) + '-' + str(course.course_id_id)
            if Cache.objects.filter(key=key).exists():
                cache_str = Cache.objects.filter(key=key)[0].cache_str
                cache = json.loads(cache_str)
                sum = 0
                for ele in cache['checkList']:
                    sum += ele
                course.progress = sum*100/len(cache['checkList'])
            else:
                course.progress = 0
            filter_type = int(filter_type)

        paginator = Paginator(course_obj, 8)
        try:
            courses = paginator.page(page)
        except PageNotAnInteger:
            courses = paginator.page(1)
        except EmptyPage:
            courses = paginator.page(paginator.num_pages)
        return render(request, 'student/courses.html',
                      {'lang': getLanguage(request)[0], "course_list": courses, "user_id": user_id,
                       'filter_type': filter_type})
    else:
        return redirect("/")


@csrf_exempt
def video_check(request):
    cousre_id = request.POST.get('id')
    if Sections.objects.filter(course_id=cousre_id).exists():
        key = str(request.user.id) + "-" + str(cousre_id)
        cache_str = ''
        if Cache.objects.filter(key=key).exists():
            cache_str = Cache.objects.filter(key=key)[0].cache_str
            cache = json.loads(cache_str)
            continuous = 0
            print("cache::", cache.get('question_no'))
            course_name = ''
            quiz_id = ''
            question_no = ''
            if cache.get('question_no') != None:
                continuous = 1
                course_name = Courses.objects.get(pk=cousre_id).course_url
                quiz_id = Sections.objects.filter(course_id=cousre_id, type='question')[0].id
                question_no = cache['question_no']
        return JsonResponse({"msg": "success", "id": cousre_id, "continous": continuous, 'course_name': course_name, 'quiz_id': quiz_id, 'question_no': question_no})
    else:
        return JsonResponse({"msg": "error"})


def options_settings(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'student/courses.html', {'lang': getLanguage(request)[0]})


def transaction(request):
    return render(request, 'student/transactions.html', {})


def security(request):
    if request.session.get('user_id') == None:
        return redirect('/')

    user_id = request.session.get('user_id')
    password = request.session.get('password')
    print("passwrod", password)
    print("user_id", user_id)
    return render(request, 'student/security.html',
                  {'lang': getLanguage(request)[0], 'user_id': user_id, 'password': password})


def payments(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    id = request.user.id
    info = []
    if payment.objects.filter(student_id=id).exists() == 1:
        payinfo = payment.objects.filter(student_id=id)
        info = payinfo[0]
    monthList = list()
    monthList.append({'key': 1, 'value': 'January'})
    monthList.append({'key': 2, 'value': 'Febrary'})
    monthList.append({'key': 3, 'value': 'March'})
    monthList.append({'key': 4, 'value': 'April'})
    monthList.append({'key': 5, 'value': 'May'})
    monthList.append({'key': 6, 'value': 'June'})
    monthList.append({'key': 7, 'value': 'July'})
    monthList.append({'key': 8, 'value': 'August'})
    monthList.append({'key': 9, 'value': 'September'})
    monthList.append({'key': 10, 'value': 'October'})
    monthList.append({'key': 11, 'value': 'November'})
    monthList.append({'key': 12, 'value': 'December'})

    year = datetime.now().year
    years = range(year, year + 10)

    return render(request, 'student/payments.html',
                  {'lang': getLanguage(request)[0], 'info': info, 'monthList': monthList, 'years': years})


def privacy(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    user = User.objects.get(pk=request.user.id)
    return render(request, 'student/privacy.html', {'lang': getLanguage(request)[0], 'user_id': request.user.id, 'user': user})


def quizes(request):
    if request.session.get('user_id') == None:
        return redirect('/')

    id = request.user.id

    # to take part in the quiz
    quizes = answers.objects.filter(student_id=id, pending=0)
    for quiz in quizes:
        secId = Sections.objects.filter(course_id=quiz.course_id).values_list('id', flat=True)
        secIdStr = map(str, secId)
        secIdStr = ",".join(secIdStr)
        quizCnt = questions.objects.extra(where=['FIND_IN_SET(section_id, "' + secIdStr + '")']).count()
        quiz.quizCnt = quizCnt
        right = answers.objects.filter(course_id=quiz.course_id, result=1).count()
        wrong = answers.objects.filter(course_id=quiz.course_id, result=0).count()
        skip = quizCnt - right - wrong
        quiz.right = right
        quiz.wrong = wrong
        quiz.skip = skip
        quiz.question_nos = quiz.question.nos - 1
    return render(request, 'student/quizes.html', {'lang': getLanguage(request)[0], 'quizes': quizes})


def certificates(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    id = request.user.id
    list = student_certificate.objects.filter(student_id=id)
    for ele in list:
        ele.course = Courses.objects.get(pk=ele.course_id)

    return render(request, 'student/certificates.html', {'lang': getLanguage(request)[0], 'list': list})


# def viewcertificates(request):
# 	if request.session.get('user_id') == None:
# 		return redirect('/')
# 	id = request.user.id
# 	list = student_certificate.objects.filter(student_id=id)
# 	pdfname = id+'_'+list.course_id+'.pdf'
# 	try:
# 	    return FileResponse(open(pdfname,'rb'),content_type='application/pdf')
# 	except FileNotFoundError:
# 	    raise Http404()

# def viewcertificates(request):
#     with codecs.open('Volpone.pdf', 'r',encoding='utf-8',errors='ignore') as pdf:
#         response = HttpResponse(pdf.read(), content_type='application/pdf')
#         response['Content-Disposition'] = 'inline;filename=Volpone.pdf'
#         return response

def viewcertificates(request):
    try:
        pdfshow = FileResponse(open('Volpone.pdf', 'rb'), content_type='application/pdf')
        return render(request, 'student/viewcertificates.html')
    except FileNotFoundError:
        raise Http404()


def PurchaseHistory(request):
    if request.session.get('user_id') == None:
        return redirect('/')

    getuser = User.objects.values('first_name', 'last_name').filter(id=request.session.get('user_id'))[0]
    payersname = getuser['first_name'] + "_" + getuser['last_name']

    purchaseList = student_register_courses.objects.filter(student_id_id=request.session.get('user_id'))
    filter_type = request.GET.get('filter_type')

    for i in purchaseList:
        if i.order_id:
            i.invoiceurl = "/invoices/" + i.order_id + "_" + payersname + ".jpg"
        else:
            i.invoiceurl = "/invoices/" + "_" + payersname + ".jpg"

    number_of_courses_in_a_page = 15

    purchaseList_page = request.GET.get('purchaseList_page', 1)
    purchaseList_paginator = Paginator(purchaseList, number_of_courses_in_a_page)

    try:
        purchaseList = purchaseList_paginator.page(purchaseList_page)
    except PageNotAnInteger:
        purchaseList = purchaseList_paginator.page(1)
    except EmptyPage:
        purchaseList = purchaseList_paginator.page(purchaseList_paginator.num_pages)

    return render(request, 'student/PurchaseHistory.html',
                  {'lang': getLanguage(request)[0], 'purchaseList': purchaseList})


def student_messages(request):
    if request.session.get('user_id') == None:
        return redirect('/')

    user_id = request.session.get("user_id")
    user_type = request.session.get("user_type")

    teacher_list = []
    teacher_dict = {}

    if user_id:
        profile = User.objects.get(id=user_id)
        user_name = profile.first_name + " " + profile.last_name

    if user_type == "student":
        if student_register_courses.objects.filter(student_id_id=user_id).exists():
            obj = student_register_courses.objects.filter(student_id_id=user_id)
            for i in obj:
                course_obj = Courses.objects.filter(id=i.course_id.id,
                                                    type=0)  # only paid course can access message function..
                for k in course_obj:
                    teacher_dict["course_name"] = k.name
                    teacher_dict["course_id"] = k.id
                    user_obj = User.objects.filter(id=k.user_id)
                    for j in user_obj:
                        unread = Messages.objects.filter(receiver_id=user_id, sender_id=j.id,
                                                         course_id=i.course_id.id, is_read=0)
                        teacher_dict["teacher_id"] = j.id
                        teacher_dict["teacher_name"] = j.first_name + " " + j.last_name
                        teacher_dict["teacher_image"] = j.image
                        if len(unread) == 0:
                            teacher_dict["unread"] = 0
                        else:
                            teacher_dict["unread"] = 1
                teacher_list.append(teacher_dict)
                teacher_dict = {}
        print("test::", teacher_list)
        return render(request, 'student/messages.html',
                      {'lang': getLanguage(request)[0], "teacher_list": teacher_list, "user_id": user_id,
                       "user_name": user_name})
    else:
        return render(request, 'student/messages.html', {'lang': getLanguage(request)[0], "user_id": user_id})


def student_notifications(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    id = request.user.id
    noti_list = notifications.objects.filter(user_id=id)
    # noti_list = notifications.objects.filter(user_id=id)

    for noti in noti_list:
        findsender = User.objects.filter(id=noti.sender_id).values_list('first_name', 'last_name').annotate(
            full_name=Concat(F('first_name'), Value(' '), F('last_name'), output_field=CharField()))
        noti.sendername = findsender[0][2]
        noti.dateformat = noti.created_at

    return render(request, 'student/notifications.html', {'lang': getLanguage(request)[0], 'noti_list': noti_list})


def quizes2(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'student/quizes-2.html', {'lang': getLanguage(request)[0]})


def student_cart(request):
    if request.session.get('user_id') == None:
        return redirect('/')
    return render(request, 'student/student_cart.html', {'lang': getLanguage(request)[0]})


def savePaymentInfo(request):
    id = request.POST.get('id')
    cardNo = request.POST.get('cardNo')
    cvv = request.POST.get('cvv')
    month = request.POST.get('month')
    year = request.POST.get('year')
    print("save Payment info")

    if payment.objects.filter(student_id=id).exists() == 1:
        one = payment.objects.filter(student_id=id)[0]
        one.card_no = cardNo
        one.cvv = cvv
        one.month = month
        one.year = year
        one.save()
    else:
        one = payment(
            card_no=cardNo,
            cvv=cvv,
            month=month,
            year=year,
            student_id=id
        )
        one.save()
    ret = {'msg': 'success'}
    return JsonResponse(ret)

@csrf_exempt
def getCourseRatingByStudent(request):
    student_id = request.POST.get('student_id')
    course_id = request.POST.get('course_id')
    rating = 0
    comment = ''
    status = 0
    if course_comments.objects.filter(user_id=student_id, course_id_id=course_id).exists() :
        rating = course_comments.objects.filter(user_id=student_id, course_id_id=course_id)[0].rating
        comment = course_comments.objects.filter(user_id=student_id, course_id_id=course_id)[0].comment
        status = 1
    ret = {
        'status': status,
        'rating':  rating,
        'comment': comment
    }
    return JsonResponse(ret)

@csrf_exempt
def getRating(request):
    student_id = request.POST.get('student_id')
    course_id = request.POST.get('course_id')
    rating = 0
    comment = ''
    if course_comments.objects.filter(user_id=student_id, course_id_id=course_id).exists():
        ele = course_comments.objects.filter(user_id=student_id, course_id_id=course_id)[0]
        rating = ele.rating
        comment = ele.comment
    ret = {
        'rating': rating,
        'comment': comment
    }
    return JsonResponse(ret)

@csrf_exempt
def saveReviewReply(request):
    id = request.POST.get('id')
    reply = request.POST.get('reply')
    status = 1
    try:
        ele = course_comments.objects.get(pk=id)
        ele.reply = reply
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def removeReviewReply(request):
    id = request.POST.get('id')
    status = 1
    try:
        ele = course_comments.objects.get(pk=id)
        ele.reply = ''
        ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def addToProfileReview(request):
    id = request.POST.get('id')
    comment = course_comments.objects.get(pk=id)
    comment.approved_by_teacher = 1
    comment.save()
    ret = {
        'status': 1
    }
    return JsonResponse(ret)

@csrf_exempt
def removeFromProfileReview(request):
    id = request.POST.get('id')
    comment = course_comments.objects.get(pk=id)
    comment.approved_by_teacher = 0
    comment.save()
    ret = {
        'status': 1
    }
    return JsonResponse(ret)

@csrf_exempt
def saveRating(request):
    student_id = request.POST.get('student_id')
    course_id = request.POST.get('course_id')
    rating = request.POST.get('rating')
    comment = request.POST.get('comment')
    status = 1
    try:
        if course_comments.objects.filter(user_id=student_id, course_id_id=course_id).exists():
            ele = course_comments.objects.filter(user_id=student_id, course_id_id=course_id)[0]
            ele.rating = rating
            ele.comment = comment
            ele.save()
        else:
            ele = course_comments(
                rating=rating,
                course_id_id=course_id,
                user_id=student_id,
                comment=comment
            )
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)
