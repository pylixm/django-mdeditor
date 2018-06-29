# -*- coding:utf-8 -*-
import django

from .views import UploadView

if django.VERSION[0] > 1:
    from django.urls import re_path as url_func
else:
    from django.conf.urls import url as url_func


urlpatterns = [
    url_func(r'^uploads/$', UploadView.as_view(), name='uploads'),
]