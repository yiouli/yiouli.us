from yolohlife.settings.base import *

ALLOWED_HOSTS = ['wwww.yiouli.us', 'yiouli.us', 'www.yoloh.life', 'yoloh.life', 'localhost']
DEBUG = False

STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
STATICFILES_DIRS = []