from __future__ import absolute_import

from django import forms
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.template.loader import render_to_string
from django.utils.encoding import force_text
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe

try:
    # Django >=1.7
    from django.forms.utils import flatatt
except ImportError:
    # Django <1.7
    from django.forms.util import flatatt


DEFAULT_CONFIG = {
    'width': '90%',
    'heigth': 500,
    'toolbar': ["undo", "redo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime",
                "emoji", "html-entities", "pagebreak", "goto-line", "|",
                "help", "info",
                "||", "preview", "watch", "fullscreen"],
    'upload_image_formats': ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    'image_floder': 'editor',
    'theme': 'default',  # dark / default
    'preview_theme': 'default',  # dark / default
    'editor_theme': 'default',  # pastel-on-dark / default
    'toolbar_autofixed': True,
    'search_replace': True,
    'emoji': True,
    'tex': True,
    'flow_chart': True,
    'sequence': True
}


class MDEditorWidget(forms.Textarea):
    """
    Widget providing Editor.md for Rich Text Editing.
    see Editor.md docs: https://pandao.github.io/editor.md/examples/index.html
    """
    def __init__(self, config_name='default', *args, **kwargs):
        super(MDEditorWidget, self).__init__(*args, **kwargs)
        # Setup config from defaults.
        self.config = DEFAULT_CONFIG.copy()

        # Try to get valid config from settings.
        configs = getattr(settings, 'MDEDITOR_CONFIGS', None)
        if configs:
            if isinstance(configs, dict):
                # Make sure the config_name exists.
                if config_name in configs:
                    config = configs[config_name]
                    # Make sure the configuration is a dictionary.
                    if not isinstance(config, dict):
                        raise ImproperlyConfigured('MDEDITOR_CONFIGS["%s"] \
                                setting must be a dictionary type.' %
                                                   config_name)
                    # Override defaults with settings config.
                    self.config.update(config)
                else:
                    raise ImproperlyConfigured("No configuration named '%s' \
                            found in your CKEDITOR_CONFIGS setting." %
                                               config_name)
            else:
                raise ImproperlyConfigured('CKEDITOR_CONFIGS setting must be a\
                        dictionary type.')

    def render(self, name, value, attrs=None):
        if value is None:
            value = ''

        final_attrs = self.build_attrs(self.attrs, attrs, name=name)
        return mark_safe(render_to_string('markdown.html', {
            'final_attrs': flatatt(final_attrs),
            'value': conditional_escape(force_text(value)),
            'id': final_attrs['id'],
            'config': self.config,
        }))

    def build_attrs(self, base_attrs, extra_attrs=None, **kwargs):
        """
        Helper function for building an attribute dictionary.
        This is combination of the same method from Django<=1.10 and Django1.11+
        """
        attrs = dict(base_attrs, **kwargs)
        if extra_attrs:
            attrs.update(extra_attrs)
        return attrs

    def _get_media(self):
        return forms.Media(
            css={
                "all": ("css/editormd.css",)
            },
            js=(
                "js/jquery.min.js",
                "js/editormd.min.js",
            ))
    media = property(_get_media)
