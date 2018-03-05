from __future__ import absolute_import

from django.db import models

from mdeditor.fields import MDTextField
# from django_mdeditor.fields import RichTextUploadingField


class ExampleModel(models.Model):
    name = models.CharField(max_length=10)
    content = MDTextField()
    content_test = models.TextField()


