from django.db.models.fields import EmailField, TextField

from modelcluster.fields import ParentalManyToManyField
from phonenumber_field.modelfields import PhoneNumberField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.core.models import Page
from wagtail.core.fields import RichTextField


class PerspectivePage(Page):
    subpage_types = []

    name = TextField()
    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel('name'),
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("name"),
        APIField("body"),
    ]


class InsightPage(Page):
    subpage_types = []

    body = RichTextField(default='')
    perspectives = ParentalManyToManyField(PerspectivePage, blank=True, related_name='related_insights')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
        FieldPanel('perspectives'),
    ]

    api_fields = [
        APIField("name"),
        APIField("body"),
    ]


class MilestonePage(Page):
    subpage_types = []

    objective = TextField(default='')
    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel('objective', classname='title'),
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("objective"),
        APIField("body"),
    ]


class MomentPage(Page):
    subpage_types = []

    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("body"),
    ]


class ProjectPage(Page):
    subpage_types = [InsightPage, MilestonePage, MomentPage]

    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("body"),
    ]


class JourneyPage(Page):
    subpage_types = [InsightPage, MomentPage, ProjectPage]

    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("body"),
    ]


class LifePage(Page):
    subpage_types = [InsightPage, MomentPage, JourneyPage, ProjectPage]

    body = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
    ]

    api_fields = [
        APIField("body"),
    ]


class IndividualPage(Page):
    subpage_types = [LifePage, PerspectivePage]

    first_name = TextField()
    last_name = TextField()
    email = EmailField()
    phone = PhoneNumberField(null=True, blank='True')
    about = RichTextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel('first_name'),
        FieldPanel('last_name'),
        FieldPanel('email'),
        FieldPanel('phone'),
        FieldPanel("about", classname='full'),
    ]

    api_fields = [
        APIField('first_name'),
        APIField('last_name'),
        APIField('email'),
        APIField('phone'),
        APIField("about"),
    ]

