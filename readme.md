# Overview

[Personal website](http://yiouli.us) developed on top of [Wagtail](https://wagtail.io/) & [Django](https://www.djangoproject.com/), and hosted in Google Cloud.

# Dev Environment Setup

## Python

This repo requires [Python 3.9.5+](https://www.python.org/downloads/).

Create and activate virtual environment in the root folder:

    python3 -m venv .venv
    source .venv/bin/activate

Install required Python package dependencies:

    pip install -r requirements.txt


## Javascript/React

This repo requires [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Install npm dependencies:

    cd frontend; npm install


## Google Cloud

Make sure [Google Client SDKs](https://cloud.google.com/sdk/docs/install) are installed.

Create a new gcloud configuration if it's not created yet:

    gcloud config configurations create <your_configuration_name>

Otherwise activate the configuration:

    gcloud config configurations activate <your_configuration_name>

Then set the project name and account in the configuration if you haven't done so:

    gcloud config set project <project_name_from_google_cloud>
    gcloud config set account <your_google_account_email_address>

Authenticate with your account:

    gcloud auth login

Reload your bash to populate project name in variables.

## Commandline (Bash)

> **Several command alias used below are defined in local [.bashrc](.bashrc) file in this repository, it's important to complete this section before following further steps.**

First setup bash to load local [.bashrc](.bashrc) file in the repository, by adding the following to ~/.bashrc:

     PROMPT_COMMAND='if [[ "$bashrc" != "$PWD" && "$PWD" != "$HOME" && -e .bashrc ]]; then bashrc="$PWD"; . .bashrc; fi'

Make sure to following steps while running from bash that has loaded the local [.bashrc](.bashrc) file.

## Django

Make sure Django is using the desired settings in your local environment, by checking the `DJANGO_SETTINGS_MODULE` environment variable (default to use the `prod` settings if varible not set):

    echo DJANGO_SETTINGS_MODULE

Switch `dev` vs. `prod` settings by using the `dev` and `prod` command respectively. `dev` settings point to sqlite3 database in local foler and build/serve static files locally; `prod` settings point to Google Cloud Postgres database and serves static files out of Google Cloud Storage.


# Build & Deploy

> Right now Google Cloud Build is setup to [automatically build & deploy on new commit](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/56e733fd-0436-4ff9-b43e-8373db527496?project=yoloh-life) to the main branch in this Github repository.

## Build Frontend Locally

To build Javascript bundle, run in the root directory:

    npm run dev

This builds the development version. Run the following for production version:

    npm run build

Javascript is built with [Webpack](https://webpack.js.org/), using [Babel](https://babeljs.io/) as transcoder/loader. Build configurations are in [webpack.config.js](webpack.config.js) and compiling configurations are in [.babelrc](.babelrc). Additionally, common build/test commands are hooked into `npm` via [package.json](package.json).

## Build & Deploy with Google Cloud Build

To manually trigger build & deployment of the application in Google Cloud, run:

    deploy

The build & deploy process on a high level:
1. gcloud CLI collect all local files, excluding files specified in [.gcloudignore](.gcloudignore) or [.gitignore](.gitignore) when .gcloudignore is not present, packaged them in a tarball and upload the package to Google Cloud storage.
2. Google Cloud Build run build steps specified in [cloudbuild.yaml](cloudbuild.yaml). The steps include
    - building frontend (configured by [package.json](package.json))
    - building & pushing docker image (configured by [Dockerfile](Dockerfile)) to Google Artifact Registry
    - collect static files (using django [collectstatic](https://docs.djangoproject.com/en/4.1/ref/contrib/staticfiles/), configured by [django settings](yolohlife/settings/prod.py)) from the cloud build machine into Google Cloud Storage
    - deploy to Google Cloudrun service.

## Database & File Uploads

Currently the database (i.e. Django/Wagtail data) is stored using SQLite, in the file db.sqlite3. The file is packaged inside the docker file and accessed by the Cloudrun web servers locally. As result, any write operations happening in production **will not persist**. To update data, run the server locally and edit via admin portal on localhost, then run build & deploy to upload the modified database file.

## DNS Routing

DNS routing needs to be setup if custom domain is needed. To setup DNS:

1. first go to [Google Cloud Run domain mappings page](https://console.cloud.google.com/run/domains), click on three dots -> DNS records for the cloud run instance that hosts the service container, and copy the DNS records.
2. Go to domain hosting service (e.g. godaddy.com), go the DNS configuration page for the domain, and add in DNS records from step 1.

It takes another ~10 minutes after the DNS records update for SSL certificate to setup. After than the site should be accessible via custom domain.


# Testing

## Unit Test

TBD

## Run Application Locally

To run server & continuous frontend build locally, run:

    run

This will run the processes with debug settings in the back ground. To stop, run:

    stop

Settings can be switched between dev & prod, using command `dev` and `prod`.

Once the application is running locally, the site should be accessible at http://localhost:8000 & the admin portal accessible at http://localhost:8000/admin

## Run Locally with PROD Settings

Is also possible to run the site locally while using Cloud storage & database.
> **Note that in this setup, any changes in local environment (file or database) will be seen in production**.

Switch Django to use `prod` settings, run:

    prod

#### Setup Google Cloud SQL Proxy

> This part is currently deprecated as the DB is right now using sqlite3 file instead of an actual cloud SQL database, due to cost.

To authenticate local connection to Google Cloud SQL, a proxy needs to be running locally. Following the steps:

1. Download `cloud_sql_proxy`:
```
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
```

2. Make `cloud_sql_proxy` executable, move it to PATH location:
```
chmod +x cloud_sql_proxy
mv ..../cloud_sql_proxy ~/.local/bin/
```
3. Setup local directory for socket connections:
```
sudo mkdir /cloudsql; sudo chmod 777 /cloudsql
```
4. Start a new bash, and run `dbproxy` (defined in local [.bashrc](.bashrc))

Now, run Django locally with `run`. Note that frontend assets (including js files) would be served from Google Cloud instead of your local version.
