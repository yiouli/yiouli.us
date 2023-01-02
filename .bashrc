# add following line to ~/.bashrc
# PROMPT_COMMAND='if [[ "$bashrc" != "$PWD" && "$PWD" != "$HOME" && -e .bashrc ]]; then bashrc="$PWD"; . .bashrc; fi'

echo "Initializing local .bashrc..."

export DJANGO_SETTINGS_MODULE="yolohlife.settings.dev"

GCLOUD_SERVICE_ACCOUNT=$(gcloud iam service-accounts list --filter cloudrun-serviceaccount --format "value(email)")
PROJECT_ID=$(gcloud config get-value core/project)
REGION="us-west1"
# this should be the same name of artifact registry in google cloud console
REGISTRY='yiouli-us'
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REGISTRY}/site:latest"

APPROOT=$PWD
GC_BUILD_FILE="${APPROOT}/cloudbuild.yaml"

alias dev="export DJANGO_SETTINGS_MODULE='yolohlife.settings.dev'; echo 'Changed Django settings to dev'"
alias prod="export DJANGO_SETTINGS_MODULE='yolohlife.settings.prod'; echo 'Changed Django settings to prod'"

alias appsettings="gcloud secrets versions access latest --secret application_settings && echo ''"
alias adminpw="gcloud secrets versions access latest --secret admin_password && echo ''"

alias jsb="cd $APPROOT/frontend; npm run dev; cd $APPROOT"
alias jsbprod="cd $APPROOT/frontend; npm run build; cd $APPROOT"
alias build="jsbprod; gcloud builds submit --config $GC_BUILD_FILE --substitutions _IMAGE=$IMAGE"
alias deploy="gcloud run deploy yiouli-us --platform managed --region $REGION \
  --image $IMAGE \
  --service-account $GCLOUD_SERVICE_ACCOUNT \
  --min-instances 0 \
  --max-instances 2 \
  --allow-unauthenticated"
alias bnd="build; deploy"

# alias startdb="gcloud sql instances patch ${instance} --activation-policy=NEVER"
# alias stopdb="gcloud sql instances patch ${instance} --activation-policy=ALWAYS"
# alias dbproxy="cloud_sql_proxy -dir=/cloudsql &"

alias run="python3 manage.py runserver"

dev
source .venv/bin/activate
