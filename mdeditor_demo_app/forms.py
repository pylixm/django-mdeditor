from __future__ import absolute_import

from django import forms

from mdeditor.fields import MDTextFormField
from .models import ExampleModel


class MDEditorForm(forms.Form):
    name = forms.CharField()
    content = MDTextFormField()


class MDEditorModleForm(forms.ModelForm):

    class Meta:
        model = ExampleModel
        fields = '__all__'
