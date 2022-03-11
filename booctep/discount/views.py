from django.shortcuts import render
from discount.models import *
from datetime import datetime, timedelta
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def saveCoupon(request):
    course_id = request.POST.get('course_id')
    promo_code = request.POST.get('promo_code')
    percent = request.POST.get('percent')
    valid_day = request.POST.get('valid_day')
    if percent == None or percent == '':
        percent = 0
    else:
        percent = int(percent)
    if valid_day == None or valid_day == '':
        valid_day = 0
    else:
        valid_day = int(valid_day)


    status = 1
    try:
        if discount.objects.filter(course_id=course_id).exists() == 0:
            expire = datetime.now() + timedelta(valid_day)
            expire = datetime.strftime(expire, '%Y-%m-%d')
            ele = discount(
                course_id=course_id,
                promo_code=promo_code,
                expire=expire,
                discount_percent=percent,
                days=valid_day
            )
            ele.save()
        else:
            ele = discount.objects.filter(course_id=course_id)[0]
            expire = ele.expire
            days = ele.days
            expire = datetime.strptime(expire, '%Y-%m-%d') - timedelta(days) + timedelta(valid_day)
            expire = datetime.strftime(expire, '%Y-%m-%d')
            ele.days = valid_day
            ele.promo_code = promo_code
            ele.expire = expire
            ele.save()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)

@csrf_exempt
def deleteCoupon(request):
    id = request.POST.get('course_id')
    status = 1
    try:
        if discount.objects.filter(course_id=id).exists():
            discount.objects.filter(course_id=id)[0].delete()
    except:
        status = 0
    ret = {
        'status': status
    }
    return JsonResponse(ret)



