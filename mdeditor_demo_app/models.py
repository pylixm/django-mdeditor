from __future__ import absolute_import

from django.db import models
from mdeditor.fields import MDTextField


class ExampleModel(models.Model):
    name = models.CharField(max_length=10)
    content = MDTextField()
    content2 = MDTextField(config_name='custom')
    content_test = models.TextField()


