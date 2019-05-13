
# django-mdeditor


[![ENV](https://img.shields.io/badge/release-v0.1.14-blue.svg)](https://github.com/pylixm/django-mdeditor)
[![ENV](https://img.shields.io/badge/Chinese-v0.1.14-blue.svg)](./README_CN.md)
[![ENV](https://img.shields.io/badge/Gitter-v0.1.14-blue.svg)](https://gitter.im/django-mdeditor/Lobby)
[![ENV](https://img.shields.io/badge/python-2.x/3.x-green.svg)](https://github.com/pylixm/django-mdeditor)
[![ENV](https://img.shields.io/badge/django-1.7+-green.svg)](https://github.com/pylixm/django-mdeditor)
[![LICENSE](https://img.shields.io/badge/license-GPL3.0-green.svg)](https://github.com/pylixm/django-mdeditor/master/LICENSE.txt)

![](./django_and_editor.png)

**Django-mdeditor** is Markdown Editor plugin application for [django](djangoproject.com) base on [Editor.md](https://github.com/pandao/editor.md).

**Django-mdeditor** was inspired by great [django-ckeditor](https://github.com/django-ckeditor/django-ckeditor).

**Note:** For Markdown page rendering issues, backend rendering is recommended. Because `Editor.md` has not been updated for a long time, some bugs and compatibility issues need to be debugged. Of course, front-end students can choose.

## Features

- Almost Editor.md features 
    - Support Standard Markdown / CommonMark and GFM (GitHub Flavored Markdown);
    - Full-featured: Real-time Preview, Image (cross-domain) upload, Preformatted text/Code blocks/Tables insert, Search replace, Themes, Multi-languages;
    - Markdown Extras : Support ToC (Table of Contents), Emoji;
    - Support TeX (LaTeX expressions, Based on KaTeX), Flowchart and Sequence Diagram of Markdown extended syntax;
- Can constom Editor.md toolbar 
- The MDTextField field is provided for the model and can be displayed directly in the django admin.
- The MDTextFormField is provided for the Form and ModelForm.
- The MDEditorWidget is provided for the Admin custom widget.


## Quick start

- Installation.
```bash
    pipenv install django-mdeditor
    # or
    pip install django-mdeditor
```

- Add `mdeditor` to your INSTALLED_APPS setting like this:
```python
    INSTALLED_APPS = [
        ...
        'mdeditor',
    ]
```

- Add 'media' url to your settings like this:
```python
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
MEDIA_URL = '/media/'

```
Make folder `uploads/editor` in you project for media files.  

- Add url to your urls like this:
```python
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
...

urlpatterns = [
    ...
    url(r'mdeditor/', include('mdeditor.urls'))
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

- Write your models like this:
```python
from django.db import models
from mdeditor.fields import MDTextField

class ExampleModel(models.Model):
    name = models.CharField(max_length=10)
    content = MDTextField()
```

- Register your model in `admin.py`

- Run `python manage.py makemigrations` and `python manage.py migrate` to create your models.

- Login Admin ,you can see a markdown editor text field like this:

![](/screenshot/admin-example.png)


## Usage

### Edit fields in the model using Markdown

Using Markdown to edit the fields in the model, we simply replace the `TextField` of the model with` MDTextField`.

```python
from django.db import models
from mdeditor.fields import MDTextField

class ExampleModel (models.Model):
    name = models.CharField (max_length = 10)
    content = MDTextField ()
```

Admin in the background, will automatically display markdown edit rich text.

Used in front-end template, you can use like this:
```python
{% load staticfiles%}
<! DOCTYPE html>
<html lang = "en">
    <head>
        <meta http-equiv = "Content-Type" content = "text / html; charset = utf-8" />

    </ head>
    <body>
        <form method = "post" action = "./">
            {% csrf_token%}
            {{form.media}}
            {{form.as_p}}
            <p> <input type = "submit" value = "post"> </ p>
        </ form>
    </ body>
</ html>

```

### Edit fields in the Form using markdown

Use markdown to edit fields in the Form, use `MDTextFormField` instead of` forms.CharField`, as follows:
```python
from mdeditor.fields import MDTextFormField

class MDEditorForm (forms.Form):
    name = forms.CharField ()
    content = MDTextFormField ()
```

`ModelForm` can automatically convert the corresponding model field to the form field, which can be used normally:
```python
class MDEditorModleForm (forms.ModelForm):

    class Meta:
        model = ExampleModel
        fields = '__all__'
```

### Use the markdown widget in admin

Use the markdown widget in admin like as :
```python
from django.contrib import admin
from django.db import models

# Register your models here.
from. import models as demo_models
from mdeditor.widgets import MDEditorWidget


class ExampleModelAdmin (admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }


admin.site.register (demo_models.ExampleModel, ExampleModelAdmin)
```
### Customize the toolbar

Add the following configuration to `settings`:
```python
MDEDITOR_CONFIGS = {
    'default':{
        'width': '90% ',  # Custom edit box width
        'heigth': 500,  # Custom edit box height
        'toolbar': ["undo", "redo", "|",
                    "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                    "h1", "h2", "h3", "h5", "h6", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime"
                    "emoji", "html-entities", "pagebreak", "goto-line", "|",
                    "help", "info",
                    "||", "preview", "watch", "fullscreen"],  # custom edit box toolbar 
        'upload_image_formats': ["jpg", "jpeg", "gif", "png", "bmp", "webp"],  # image upload format type
        'image_floder': 'editor',  # image save the folder name
        'theme': 'default',  # edit box theme, dark / default
        'preview_theme': 'default',  # Preview area theme, dark / default
        'editor_theme': 'default',  # edit area theme, pastel-on-dark / default
        'toolbar_autofixed': True,  # Whether the toolbar capitals
        'search_replace': True,  # Whether to open the search for replacement
        'emoji': True,  # whether to open the expression function
        'tex': True,  # whether to open the tex chart function
        'flow_chart': True,  # whether to open the flow chart function
        'sequence': True  # Whether to open the sequence diagram function
    }
    
}
```

## Feedback 

[issue]
Welcome to use and feedback!

## Reference

- [django-ckeditor] (https://github.com/django-ckeditor/django-ckeditor)
