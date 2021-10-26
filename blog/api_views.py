from django.conf import settings
from wagtail.api.v2.serializers import PageSerializer

from wagtail.api.v2.views import BaseAPIViewSet, PagesAPIViewSet
from wagtail.core.models import Site

from blog.models import IndividualPage, PerspectivePage, ProjectPage

class AbstractContentAPIViewSet(BaseAPIViewSet):
    name = 'content'
    serializer_class = PageSerializer

    body_fields = BaseAPIViewSet.body_fields + [
        'title',
        'body',
    ]


class IndividualsAPIViewSet(BaseAPIViewSet):
    name = 'individuals'
    model = IndividualPage
    serializer_class = PageSerializer

    body_fields = BaseAPIViewSet.body_fields + [
        'first_name',
        'last_name',
        'email',
        'phone',
        "about",
    ]


class PerspectivesAPIViewSet(AbstractContentAPIViewSet):
    model = PerspectivePage


class ProjectsAPIViewSet(AbstractContentAPIViewSet):
    model = ProjectPage

