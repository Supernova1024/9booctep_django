# from django.urls import path
from django.conf.urls import include, url, i18n
from video.views import *

urlpatterns = [
    url(r'^save_cache_str/$', saveCacheStr, name='save cache str'),
    url(r'^quiz/(?P<course_name>\w+)/(?P<quiz_id>[0-9]+)/$', video_quiz, name='student quiz'),
]