from django.contrib import admin
from django.db import models

# Register your models here.
from . import models as demo_models
from mdeditor.widgets import MDEditorWidget


class ExampleModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }


admin.site.register(demo_models.ExampleModel, ExampleModelAdmin)


