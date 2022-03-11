# from django.urls import path
from django.conf.urls import include, url, i18n
from discount.views import saveCoupon, deleteCoupon
urlpatterns = [
    url(r'^save_coupon/$', saveCoupon, name='save coupon'),
    url(r'^delete_coupon/$', deleteCoupon, name='delete coupon'),
]