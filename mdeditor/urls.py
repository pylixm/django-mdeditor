# -*- coding:utf-8 -*-
from django.conf.urls import url
from .views import UploadView

urlpatterns = [
    url(r'^uploads/$', UploadView.as_view(), name='uploads'),
]
