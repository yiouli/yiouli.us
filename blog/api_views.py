from wagtail.api.v2.serializers import PageSerializer

from wagtail.api.v2.views import BaseAPIViewSet

from blog.models import ArticlePage, IndividualPage, TopicPage

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


class TopicsAPIViewSet(AbstractContentAPIViewSet):
    model = TopicPage


class ArticlesAPIViewSet(AbstractContentAPIViewSet):
    model = ArticlePage

