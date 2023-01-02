from django.db.models.fields import DateTimeField, EmailField, TextField
from django.utils import timezone

from modelcluster.fields import ParentalManyToManyField
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework import fields
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.core.models import Page


class TopicPage(Page):

    description = TextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("description", classname='full'),
    ]

    api_fields = [
        APIField("description"),
    ]

class ArticlePage(Page):

    date = DateTimeField(default=timezone.now)
    body = TextField(default='')

    topics = ParentalManyToManyField(TopicPage, blank=True, related_name='related_topics')

    content_panels = Page.content_panels + [
        FieldPanel("body", classname='full'),
        FieldPanel('date'),
        FieldPanel('topics'),
    ]

    api_fields = [
        APIField("body"),
        APIField('date'),
        APIField('date_display', serializer=fields.DateTimeField(format='%3b %02d %Y', source='date')),
        APIField("topics"),
    ]


class IndividualPage(Page):
    subpage_types = [TopicPage, ArticlePage]

    first_name = TextField()
    last_name = TextField()
    email = EmailField()
    phone = PhoneNumberField(null=True, blank='True')
    about = TextField(default='')

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
