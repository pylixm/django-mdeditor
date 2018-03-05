from __future__ import absolute_import

from django.views import generic

from . import forms

try:
    from django.urls import reverse
except ImportError:  # Django < 2.0
    from django.core.urlresolvers import reverse


class MDEditorFormView(generic.FormView):
    form_class = forms.MDEditorForm
    template_name = 'forms.html'

    def get_success_url(self):
        return reverse('mdeditor-form')


class MDEditorModleForm(generic.FormView):
    form_class = forms.MDEditorModleForm
    template_name = 'forms.html'

    def get_success_url(self):
        return reverse('mdeditor-model-form')


mdeditor_form_view = MDEditorFormView.as_view()
mdeditor_model_form_view = MDEditorModleForm.as_view()
