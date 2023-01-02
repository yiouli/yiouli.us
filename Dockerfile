# Use an official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9-slim

ENV APP_HOME /app
WORKDIR $APP_HOME

# Install dependencies.
COPY requirements.txt .
RUN pip install -U pip && pip install -r requirements.txt

# Copy local code to the container image.
# right now the db.sqlite3 is packaged as the site is still reading from sqlite db
# it should be removed once the DB is moved to cloudSQL
# it should be added to gitignore, gcloudignore and dockerignore
COPY . .
# having this statement here to make sure the DB file is included in the docker image
COPY db.sqlite3 .

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 8080

# Setting this ensures print statements and log messages
# promptly appear in Cloud Logging.
ENV PYTHONUNBUFFERED TRUE

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 yolohlife.wsgi:application