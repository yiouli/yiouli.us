from django.db import models
from django.db.models.fields import DateTimeField, EmailField, TextField
from django.utils import timezone

from modelcluster.fields import ParentalManyToManyField
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework import fields

from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Page
from wagtail.images.blocks import ImageChooserBlock
from wagtail.images.edit_handlers import ImageChooserPanel


class IndividualPage(Page):

    first_name = TextField()
    last_name = TextField()
    email = EmailField()
    phone = PhoneNumberField(null=True, blank='True')
    about = TextField(default='')
    avatar = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )

    content_panels = Page.content_panels + [
        FieldPanel('first_name'),
        FieldPanel('last_name'),
        FieldPanel('email'),
        FieldPanel('phone'),
        FieldPanel("about", classname='full'),
        ImageChooserPanel('avatar'),
    ]

    api_fields = [
        APIField('first_name'),
        APIField('last_name'),
        APIField('email'),
        APIField('phone'),
        APIField("about"),
        APIField('avatar'),
    ]


class TopicPage(Page):

    parent_page_types = [IndividualPage]

    description = TextField(default='')

    content_panels = Page.content_panels + [
        FieldPanel("description", classname='full'),
    ]

    api_fields = [
        APIField("description"),
    ]

class ArticlePage(Page):

    parent_page_types = [IndividualPage]

    date = DateTimeField(default=timezone.now)
    content = StreamField([
        ('markdown', blocks.TextBlock()),
        ('image_with_caption', blocks.StructBlock([
            ('caption', blocks.CharBlock()),
            ('image', ImageChooserBlock()),
        ])),
    ], blank=True, null=True)

    topics = ParentalManyToManyField(TopicPage, blank=True, related_name='related_topics')

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('topics'),
        StreamFieldPanel('content'),
    ]

    api_fields = [
        APIField('date'),
        APIField('date_display', serializer=fields.DateTimeField(format='%3b %02d %Y', source='date')),
        APIField("topics"),
        APIField('content'),
    ]

