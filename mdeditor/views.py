# -*- coding:utf-8 -*-
import os
import datetime

from django.views import generic
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .configs import MDConfig
from PIL import Image

# TODO 此处获取default配置，当用户设置了其他配置时，此处无效，需要进一步完善
MDEDITOR_CONFIGS = MDConfig('default')


class UploadView(generic.View):
    """ upload image file """

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(UploadView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        upload_image = request.FILES.get("editormd-image-file", None)
        imgWidth = request.GET.get("imgWidth")
        imgHeight = request.GET.get("imgHeight")
        imgPer = request.GET.get("imgPer")
        imgQua = request.GET.get("imgQua")
        media_root = settings.MEDIA_ROOT
        # 安全检查,设置默认值
        imgWidth = imgWidth if imgWidth and int(imgWidth) else 0
        imgHeight = imgHeight if imgHeight and int(imgHeight) else 0
        imgPer = imgPer if imgPer and float(imgPer) else 1
        imgQua = imgQua if imgQua and float(imgQua) > 10 and float(imgQua) < 95 else 75

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

        # image floder check
        file_path = os.path.join(media_root, MDEDITOR_CONFIGS['image_folder'])
        if not os.path.exists(file_path):
            try:
                os.makedirs(file_path)
            except Exception as err:
                return JsonResponse({
                    'success': 0,
                    'message': "上传失败：%s" % str(err),
                    'url': ""
                })

        # save image
        file_full_name = '%s_%s.%s' % (file_name,
                                       '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now()),
                                       file_extension)
        with open(os.path.join(file_path, file_full_name), 'wb+') as file:
            img = Image.open(upload_image)  # .convert("RGB")
            # resize image with high-quality
            if int(imgWidth) > 0 and int(imgHeight) > 0:
                out = img.resize((int(imgWidth), int(imgHeight)), Image.ANTIALIAS)
            else:
                out = img.resize((int(img.size[0] * float(imgPer)), int(img.size[1] * float(imgPer))), Image.ANTIALIAS)
            out.save(file, quality=int(imgQua))


        return JsonResponse({'success': 1,
                             'message': "上传成功！",
                             'url': os.path.join(settings.MEDIA_URL,
                                                 MDEDITOR_CONFIGS['image_folder'],
                                                 file_full_name)})
