import environ
import io
from google.cloud import secretmanager as sm

from yolohlife.settings.base import *

ALLOWED_HOSTS = ['wwww.yiouli.us', 'yiouli.us', 'www.yoloh.life', 'yoloh.life']
DEBUG = False

############# GOOGLE CLOUD SETTINGS ########################################################

PROJECT_ID = "yoloh-life"
SETTINGS_NAME = "application_settings"

# Pull django-environ settings file, stored in Secret Manager
client = sm.SecretManagerServiceClient()

name = f"projects/{PROJECT_ID}/secrets/{SETTINGS_NAME}/versions/latest"
payload = client.access_secret_version(name=name).payload.data.decode("UTF-8")  # type: ignore
env = environ.Env()
env.read_env(io.StringIO(payload))

# Setting this value from django-environ
SECRET_KEY = env("SECRET_KEY")

# Set this value from django-environ
DATABASES = {"default": env.db()}

# Define static storage via django-storages[google]
DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
GS_BUCKET_NAME = env("GS_BUCKET_NAME")
GS_DEFAULT_ACL = "publicRead"
STATICFILES_DIRS = []
STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"

