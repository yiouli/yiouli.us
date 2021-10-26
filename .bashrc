# add following line to ~/.bashrc
# PROMPT_COMMAND='if [[ "$bashrc" != "$PWD" && "$PWD" != "$HOME" && -e .bashrc ]]; then bashrc="$PWD"; . .bashrc; fi'

echo "Initializing local .bashrc..."

export GOOGLE_APPLICATION_CREDENTIALS="/home/yol/yoloh-life-ee8a1daaf61d.json"
export DJANGO_SETTINGS_MODULE="yolohlife.settings.dev"

PROJECT_ID=$(gcloud config get-value core/project)
REGION="us-west1"
INSTANCE="prod"
DBNAME="yoloh"
IMAGE="gcr.io/$PROJECT_ID/wagtail-cloudrun"

APPROOT=$PWD
GCMIGRATE="${APPROOT}/cloudmigrate.yaml"

alias appsettings="gcloud secrets versions access latest --secret application_settings && echo ''"
alias adminpw="gcloud secrets versions access latest --secret admin_password && echo ''"

alias jsb="cd $APPROOT/frontend; npm run dev; cd $APPROOT"
alias jsbprod="cd $APPROOT/frontend; npm run build; cd $APPROOT"
alias gcb="jsbprod; gcloud builds submit --config $GCMIGRATE --substitutions _REGION=$REGION"
alias gcd="gcloud run deploy yoloh-life --platform managed --region $REGION \
  --image $IMAGE \
  --add-cloudsql-instances ${PROJECT_ID}:${REGION}:${INSTANCE} \
  --allow-unauthenticated"

alias startdb="gcloud sql instances patch ${instance} --activation-policy=NEVER"
alias stopdb="gcloud sql instances patch ${instance} --activation-policy=ALWAYS"
alias dbproxy="cloud_sql_proxy -dir=/cloudsql &"

alias run="python3 manage.py runserver"

source .venv/bin/activate