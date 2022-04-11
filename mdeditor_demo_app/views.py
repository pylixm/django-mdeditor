from __future__ import absolute_import

from django.views import generic

from . import forms
from . import models

try:
    from django.urls import reverse
except ImportError:  # Django < 2.0
    from django.core.urlresolvers import reverse
import mistune


class MDEditorFormView(generic.FormView):
    form_class = forms.MDEditorForm
    template_name = 'forms.html'

    def form_valid(self, form):
        kwargs = {
            'name': form.cleaned_data['name'],
            'content': form.cleaned_data['content'],
            'content_test': form.cleaned_data['content'],
            'content2': form.cleaned_data['content2']
        }
        instance = models.ExampleModel.objects.create(**kwargs)
        self.success_url = reverse('show-view', kwargs={'pk': instance.id})
        return super(MDEditorFormView, self).form_valid(form)


class MDEditorModleForm(generic.CreateView):
    form_class = forms.MDEditorModleForm
    template_name = 'forms.html'

    def get_success_url(self):
        return reverse('mdeditor-model-form')


class ShowView(generic.DetailView):
    model = models.ExampleModel
    template_name = 'show.html'

    def get_context_data(self, **kwargs):
        context = super(ShowView, self).get_context_data(**kwargs)
        example_obj = context['object']
        print(example_obj.content2)
        context['content2_html'] = mistune.markdown(example_obj.content2, escape=False) if example_obj else ''
        context['content2'] = example_obj.content2 if example_obj else ''
        print(context)
        return context

mdeditor_form_view = MDEditorFormView.as_view()
mdeditor_model_form_view = MDEditorModleForm.as_view()
show_view = ShowView.as_view()
