from django.shortcuts import render, redirect
from teacher.models import categories, Courses, VideoUploads, Sections, questions, answers, student_mark
from home.models import User
from video.models import Cache
from student.models import student_certificate, student_register_courses
import sys, traceback
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.core import serializers
import os
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
from django.conf import settings
import img2pdf
from datetime import datetime
import random, string
from random import randint

from tempfile import *
from subprocess import Popen, PIPE


def getVideoCnt(course):
    ssss = Sections.objects.filter(course_id=course.id).values_list("id", flat=True)
    ssss = map(str, ssss)
    strr = ','.join(ssss)
    videoListCnt = VideoUploads.objects.extra(where=['FIND_IN_SET(section_id, "' + strr + '")']).count()
    return videoListCnt


def playground(request, id):
    if request.session.get('user_id') == None:
        return redirect('/')

    course = Courses.objects.get(pk=id)
    is_dripping = course.dripping
    teacher_id = course.user_id
    student_for_video = request.session.get('user_id')
    first_list = []
    Dict = {}
    second_list = []
    Dict_2 = {}
    course_name = Courses.objects.get(id=id).name
    if student_register_courses.objects.filter(course_id_id=id, student_id_id=student_for_video).exists() == 0:
        return redirect('/courses')
    ele = student_register_courses.objects.filter(course_id_id=id, student_id_id=student_for_video)[0]
    time = ele.date_created
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
    nowtime = datetime.now()
    interval = (nowtime - time).days
    count_down = int((nowtime - time).total_seconds())
    count_down1 = count_down
    interval1 = interval

    key = str(request.user.id) + "-" + str(course.id)
    cache_str = ''
    if Cache.objects.filter(key=key).exists():
        cache_str = Cache.objects.filter(key=key)[0].cache_str

    section_continue_query = student_register_courses.objects.filter(course_id_id=id,
                                                                     student_id_id=student_for_video).values(
        'last_completed_section_id')
    quiz_id = 0
    for i in section_continue_query:
        section_continue = i['last_completed_section_id']
    if Sections.objects.filter(course_id=id).exists():
        sec = Sections.objects.filter(course_id=id, type='question')[0]
        quiz_id = sec.id
        _obj = Sections.objects.filter(course_id=id, type="video")
        count = 0
        count_2 = 0
        for i in _obj:
            if VideoUploads.objects.filter(section_id=i.id).exists():
                eleDict = []
                video_obj = VideoUploads.objects.filter(section_id=i.id)
                if section_continue == video_obj[0].id:
                    section_continue = 999
                for j in video_obj:
                    myDict = {}
                    count += 1
                    myDict["sr_no"] = count
                    myDict["url"] = j.url
                    myDict["video_name"] = j.name
                    myDict["id"] = j.id
                    if interval1 >= 0:
                        myDict["lock"] = 0
                    else:
                        myDict["lock"] = 1
                    myDict["count_left"] = count_down1

                    eleDict.append(myDict)
                i.videoList = eleDict
                interval1 -= 4
                count_down1 -= 3600 * 24 * 4
        obj = Sections.objects.filter(course_id=id, type="video")
        count = 0
        count_2 = 0
        for i in obj:
            count += 1
            Dict["sr_no"] = count
            Dict["section_name"] = i.name
            id_course = i.course_id
            if VideoUploads.objects.filter(section_id=i.id).exists():
                video_obj = VideoUploads.objects.filter(section_id=i.id)
                if section_continue == video_obj[0].id:
                    section_continue = 999
                for j in video_obj:
                    Dict_2["id"] = j.id
                    Dict["url"] = j.url
                    Dict["video_name"] = j.name
            if count < 2:
                # first_list.append(Dict)
                first_list = Dict
                Dict = {}
            else:
                pass
        for k in obj:
            count_2 += 1
            Dict_2["sr_no"] = count_2
            Dict_2["section_name"] = k.name
            if VideoUploads.objects.filter(section_id=k.id).exists():
                video_obj = VideoUploads.objects.filter(section_id=k.id)
                if section_continue == video_obj[0].id:
                    section_continue = 999
                for h in video_obj:
                    Dict_2["id"] = h.id
                    Dict_2["url"] = h.url
                    Dict_2["video_name"] = h.name
            second_list.append(Dict_2)
            Dict_2 = {}
        Length = len(second_list)

        if Length > 1:
            for e in range(len(second_list) - 1, -1, -1):
                if second_list[e]['sr_no'] == 1:
                    second_list.pop(e)
            return render(request, 'video/playground.html',
                          {'section_continue': section_continue, "video_list": video_obj, "course": course, 'cache_str': cache_str, 'count_down': count_down,
                           "first_video": first_list, "second_video": second_list, "course_id": id, 'dripping':is_dripping, 'quiz_id':quiz_id,
                           "id_course": id_course, 'section_list': _obj, 'teacher_id': teacher_id, 'interval':interval})
        else:
            return render(request, 'video/playground.html',
                          {'section_continue': section_continue, "video_list": video_obj, "course": course, 'cache_str': cache_str, 'count_down': count_down,
                           "first_video": first_list, "course_id": id, 'dripping':is_dripping, "id_course": id_course, 'section_list': _obj, 'quiz_id': quiz_id,
                           'teacher_id': teacher_id, 'interval':interval})
    else:
        return render(request, 'video/playground.html', {})

@csrf_exempt
def saveCacheStr(request):
    key = request.POST.get('key')
    cache_str = request.POST.get('cache_str')
    status = 1
    try:
        if Cache.objects.filter(key=key).exists():
            ele = Cache.objects.filter(key=key)[0]
            ele.cache_str = cache_str
            ele.save()
        else:
            ele = Cache(
                key=key,
                cache_str=cache_str
            )
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def addtoprogress(request, id):
    currentvidid = request.POST.get('currentvidid')
    student = request.POST.get('student')
    course = request.POST.get('course')

    courselasrsection = Sections.objects.filter(course_id=course, type="video").values('id').all().last()['id']
    lastvid = VideoUploads.objects.filter(section_id=courselasrsection).values('id')[0]['id']

    if currentvidid == 999:
        return HttpResponse("success");

    if currentvidid == lastvid:
        currentvidid = 999
        addprogress = student_register_courses.objects.filter(course_id_id=course, student_id_id=student)[0]
        addprogress.last_completed_section_id = currentvidid
        addprogress.save()

    return HttpResponse("success");


def video_quiz(request, course_name, quiz_id):
    question_no = request.GET.get('question')
    quiz_section = Sections.objects.get(pk=quiz_id)
    course = Courses.objects.get(pk=quiz_section.course_id)
    question_list = questions.objects.filter(section_id=quiz_id)
    question_length = len(question_list)
    key = str(request.user.id) + "-" + str(course.id)
    cache_str = ''
    if Cache.objects.filter(key=key).exists():
        cache_str = Cache.objects.filter(key=key)[0].cache_str
    if question_no == None:
        return render(request, 'video/quiz.html', {'course': course, 'question_count': question_length, 'quiz_id': quiz_id})
    else:
        end_flag = 0
        last_question_no = questions.objects.filter(section_id=quiz_id).order_by('-nos')[0].nos
        if int(question_no) == int(last_question_no) + 1:
            end_flag = 1
        if int(question_no) == int(last_question_no):
            end_flag = 2
        if end_flag != 1:
            question = questions.objects.filter(section_id=quiz_id, nos=question_no)[0]
            answer = question.answer
            left = question_length - int(question_no)
            title = question.title
            eleList = question.content.split(',')
            eleList.pop()
        else:
            eleList = []
            left = 0
            title = ''
            answer = ''
            question_no = int(question_no) - 1
        return render(request, 'video/quiz2.html', {'course': course, 'question_count': question_length, 'quiz_id': quiz_id, 'end_flag': end_flag, 'cache_str': cache_str,
                                                    'question_no': question_no, 'left': left, 'eleList': eleList, 'answerList': answer, 'title': title})


def video_quiz2(request):
    quizNo = request.POST.get('quizNo')
    id = request.POST.get('course_id')
    course = Courses.objects.get(pk=id)

    right = request.POST.get('right')
    wrong = request.POST.get('wrong')
    skip = request.POST.get('skip')

    if right == None:
        right = 0
    if wrong == None:
        wrong = 0
    if skip == None:
        skip = 0

    if quizNo == None:
        if Sections.objects.filter(course_id=course.id).filter(type='question').exists():
            sectionList = Sections.objects.filter(course_id=course.id).filter(type='question').values_list('id',
                                                                                                           flat=True)
            sectionList = map(str, sectionList)
            idstr = ','.join(sectionList)
            quesList = questions.objects.extra(where=['FIND_IN_SET(section_id, "' + idstr + '")']).order_by('id')

            if quesList.count() == 0:
                return redirect("/courses/")
            else:
                question = quesList[0]
                quesCnt = quesList.count()
                quesEleList = question.content.split(',')
                quesEleList.pop()
    else:
        if Sections.objects.filter(course_id=course.id).filter(type='question').exists():
            sectionList = Sections.objects.filter(course_id=course.id).filter(type='question').values_list('id',
                                                                                                           flat=True)
            sectionList = map(str, sectionList)
            idstr = ','.join(sectionList)
            quesList = questions.objects.extra(where=['FIND_IN_SET(section_id, "' + idstr + '")']).order_by('id')

            if quesList.count() == 0:
                return redirect("/courses/")
            else:
                quizNo = int(quizNo)
                quesCnt = quesList.count()
                if quizNo * 1 >= quesCnt:
                    return redirect('/courses')
                question = quesList[quizNo]
                quesEleList = question.content.split(',')
                quesEleList.pop()
    if quizNo == None:
        quizNo = 0;
    return render(request, 'video/quiz2.html',
                  {'question': question, 'count': quesCnt, 'eleList': quesEleList, 'questionNo': (quizNo + 1),
                   'course_id': id, 'left': quesCnt - quizNo - 1, 'right': right, 'wrong': wrong, 'skip': skip})


def video_quiz3(request, id):
    return render(request, 'video/quiz3.html', {})


def getQuiz(request):
    course = request.POST.get('course')
    quiz = request.POST.get('quiz')


def saveQuizAnswer(request):
    course_id = request.POST.get('id')
    question_id = request.POST.get('questionId')
    data = request.POST.get('answer')
    result = request.POST.get('result')
    id = request.user.id
    type = request.POST.get('type') * 1

    try:
        if answers.objects.filter(course_id=course_id, question_id=question_id).exists():
            ans = answers.objects.filter(course_id=course_id, question_id=question_id)[0]
            ans.answer = data
            ans.pending = type
            ans.student_id = id
            ans.result = result
            ans.save()
        else:
            ans = answers(
                course_id=course_id,
                question_id=question_id,
                answer=data,
                pending=type,
                student_id=id,
                result=result
            )
            ans.save()
        msg = 'success'
    except:
        tb = sys.exc_info()[2]
        tbinfo = traceback.format_tb(tb)[0]
        msg = tbinfo + "\n"     ": " + str(sys.exc_info())

    to_return = {'msg': msg}
    return JsonResponse(to_return)


def generateRandomChar():
    x = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(8))
    return x


def getCertificate(request):
    user_id = request.user.id
    id = request.POST.get('course_id')
    src = ''
    url = settings.STATICFILES_DIRS[0] + '/certificates/en.jpg'
    img = Image.open(url)
    draw = ImageDraw.Draw(img)
    fonturl = settings.STATICFILES_DIRS[0] + '/certificates/font.ttf'
    font = ImageFont.truetype(fonturl, 80)
    name = request.user.first_name + " " + request.user.last_name
    studentfullname = request.user.first_name + "_" + request.user.last_name

    # drawing name to the img...
    length = len(name)
    dif = 12 - length
    namePos = [1250 + dif * 15, 715]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    # drawing time to the img

    videotime = 0
    secList = Sections.objects.filter(course_id=id, type='video').values_list('id', flat=True)
    secList = map(str, secList)
    secStr = ','.join(secList)
    videos = VideoUploads.objects.extra(where=['find_in_set(section_id, "'+ secStr +'")']).values_list('duration', flat=True)
    for video in videos:
        videotime += video
    hr = int(videotime / 60)
    name = str(hr) + 'hours'
    length = len(name)
    namePos = [770, 845]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    # drawing course name to the img
    course = Courses.objects.get(pk=id)
    name = course.name
    length = len(name)
    dif = 12 - length
    namePos = [1300 + dif * 15, 845]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    # drawing date to the img
    time = datetime.today().strftime("%b %d, %Y")
    name = time
    length = len(name)
    dif = 12 - length
    namePos = [2000, 845]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    # drawing teacher's name to the img
    teacher = User.objects.get(pk=course.user_id)
    name = teacher.first_name + " " + teacher.last_name
    length = len(name)
    dif = 12 - length
    namePos = [1250 + dif * 15, 1210]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    # drawing teacher's category name to the img

    name = categories.objects.get(pk=course.scat_id).name
    length = len(name)
    dif = 12 - length
    namePos = [1200 + dif * 15, 1300]

    draw.text(namePos, name, (255, 0, 255), font=font)  # this will draw text with Blackcolor and 16 size

    no = str(randint(10000000, 99999999))

    # drawing certificate no to the img

    font1 = ImageFont.truetype(fonturl, 60)
    namePos = [700, 1620]
    draw.text(namePos, no, (255, 0, 255), font=font1)  # this will draw text with Blackcolor and 16 size

    saveurl = settings.STATICFILES_DIRS[0] + '/certificates/' + studentfullname + '_' + no +'.jpg'
    saveurl1 = settings.STATICFILES_DIRS[0] + '/certificates/' + studentfullname + '_' + no +'.pdf'

    src = '/certificates/' + studentfullname + '_' + no +'.jpg'
    src1 = '/certificates/' + studentfullname + '_' + no +'.pdf'
    file = open(saveurl1, "wb")
    img.save(saveurl)
    img2 = Image.open(saveurl)
    pdf_bytes = img2pdf.convert(img2.filename)
    file.write(pdf_bytes)

    # save this file url to the db;

    if student_certificate.objects.filter(course_id=id, student_id=user_id).exists() == 1:
        one = student_certificate.objects.filter(course_id=id, student_id=user_id)[0]
        one.url = src1
        one.save()
    else:
        one = student_certificate(
            course_id=id,
            student_id=user_id,
            url=src1,
            no=no
        )
        one.save()
    ret = {'msg': 'success', 'src': src1}
    return JsonResponse(ret)

# return render(request, 'video/img_view.html', {'src' : src})

def saveQuizMark(request):
    mark = request.POST.get('mark')
    id = request.user.id
    course = request.POST.get('course')

    if student_mark.objects.filter(course_id=course, student_id=id).exists() == 0:
        new = student_mark(
            course_id=course,
            student_id=id,
            mark=mark
        )
        new.save()
    else:
        one = student_mark.objects.filter(course_id=course, student_id=id)
        one[0].mark = mark
        one[0].save()
    to_return = {'msg': 'success'}
    return JsonResponse(to_return)
