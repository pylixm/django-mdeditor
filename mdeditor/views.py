# -*- coding:utf-8 -*-
import os
import datetime

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.views import generic
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .configs import MDConfig

# TODO 此处获取default配置，当用户设置了其他配置时，此处无效，需要进一步完善
MDEDITOR_CONFIGS = MDConfig('default')


class UploadView(generic.View):
    """ upload image file """

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(UploadView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        upload_image = request.FILES.get("editormd-image-file", None)

        # image none check
        if not upload_image:
            return JsonResponse({
                'success': 0,
                'message': "未获取到要上传的图片",
                'url': ""
            })

        # image format check
        file_name_list = upload_image.name.split('.')
        file_extension = file_name_list.pop(-1)
        file_name = '.'.join(file_name_list)
        if file_extension not in MDEDITOR_CONFIGS['upload_image_formats']:
            return JsonResponse({
                'success': 0,
                'message': "上传图片格式错误，允许上传图片格式为：%s" % ','.join(
                    MDEDITOR_CONFIGS['upload_image_formats']),
                'url': ""
            })

        file_full_name = '%s_%s.%s' % (file_name,
                                       '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now()),
                                       file_extension)
        full_path = os.path.join(MDEDITOR_CONFIGS['image_folder'], file_full_name)

        try:
            default_storage.save(full_path, ContentFile(upload_image.read()))
        except Exception as err:
            return JsonResponse({
                'success': 0,
                'message': "上传失败：%s" % str(err),
                'url': ""
            })

        return JsonResponse({'success': 1,
                             'message': "上传成功！",
                             'url': default_storage.url(full_path)})
