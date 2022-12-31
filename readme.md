# Description

[Personal website](http://yoloh.life) developed on top of [Wagtail](https://wagtail.io/) & [Django](https://www.djangoproject.com/), and hosted in Google Cloud.


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

# Environment Setup

> **Several command alias used below are defined in local [.bashrc](.bashrc) file in this repository, it's important to complete this section before following further steps.**

First setup bash to load local [.bashrc](.bashrc) file in the repository, by adding the following to ~/.bashrc:

     PROMPT_COMMAND='if [[ "$bashrc" != "$PWD" && "$PWD" != "$HOME" && -e .bashrc ]]; then bashrc="$PWD"; . .bashrc; fi'

Make sure to following steps while running from bash that has loaded the local [.bashrc](.bashrc) file.

## Django

Make sure Django is using the desired settings in your local environment, by checking the `DJANGO_SETTINGS_MODULE` environment variable (default to use the `prod` settings if varible not set):

    echo DJANGO_SETTINGS_MODULE

Switch `dev` vs. `prod` settings by using the `dev` and `prod` command respectively. `dev` settings point to sqlite3 database in local foler and build/serve static files locally; `prod` settings point to Google Cloud Postgres database and serves static files out of Google Cloud Storage.


# Build

## Frontend

To build Javascript bundle, run:

    jsb

This builds the development version. Run the following for production version:

    jsbprod

Javascript is built with [Webpack](https://webpack.js.org/), using [Babel](https://babeljs.io/) as transcoder/loader. Build configurations are in [webpack.config.js](frontend/webpack.config.js) and compiling configurations are in [.babelrc](frontend/.babelrc). Additionally, common build/test commands are hooked into `npm` via [package.json](frontend/package.json).

## Server

This repo uses Docker to build container for server. The image can be directly build in Google Cloud Build, or built locally.

### Cloud Build
To build server image in Google Cloud, run:

    gcb

This command builds frontend in production settings locally before submit local files to Google Cloud and build remotely in the cloud. After successful build, the built image would be stored in Google Cloud Container Registry.

What files are uploaded to cloud build is controled by [.gcloudignore](.gcloudignore), the cloud build steps are configured in [cloudmigrate.yaml](cloudmigrate.yaml), and the docker build steps (run in cloud) are configured in [Dockerfile](Dockerfile).

> **Please make sure frontend build is up-to-date before building container locally.**

### Local Build

TBD

# Deploy

The application is currently hosted in Google Cloud. The server image is hosted via Google Cloud Run; database is Google Could SQL (Postgres); and files are served from Google Cloud Storage. All of them are based in `us-west1 (Oregon)` region.

To deploy the latest image to the internet, run:

    gcd

Browser cache might need to be cleared to see the latest changes in frontend.

## DNS Routing

DNS routing needs to be setup if custom domain is needed. To setup DNS:

1. first go to [Google Cloud Run domain mappings page](https://console.cloud.google.com/run/domains), click on three dots -> DNS records for the cloud run instance that hosts the service container, and copy the DNS records.
2. Go to domain hosting service (e.g. godaddy.com), go the DNS configuration page for the domain, and add in DNS records from step 1.

It takes another ~10 minutes after the DNS records update for SSL certificate to setup. After than the site should be accessible via custom domain.


# Testing

## Unit Test

TBD

## Run Application Locally

To run with local settings without the need to connect & update in Google Cloud, first make sure Django is using dev settings, run:

    dev

Start a dedicated process to automatically build frontend assets upon file changes:

    cd frontend; npm run watch

Start a dedicated process to run Django server locally:

    run

Now the site should be accessible on http://localhost:8000.

## Run Locally with PROD Settings

Is also possible to run the site locally while using Cloud storage & database.
> **Note that in this setup, any changes in local environment (file or database) will be seen in production**.

Switch Django to use `prod` settings, run:

    prod

#### Setup Google Cloud SQL Proxy

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
