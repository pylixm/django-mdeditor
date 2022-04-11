from django.urls import re_path
from django.views.generic import TemplateView
from .views import mdeditor_form_view, mdeditor_model_form_view, show_view

urlpatterns = [
    re_path(r'^$', mdeditor_form_view, name='mdeditor-form'),
    re_path(r'^model/$', mdeditor_model_form_view, name='mdeditor-model-form'),
    re_path(r'^show/(?P<pk>\w+)/$', show_view, name='show-view'),
]
