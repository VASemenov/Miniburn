# Miniburn

## Prerequisites

- Python 3.8 and higher
- NodeJS
- MongoDB
- Docker (for deployment)

## Install dependencies

Run `./deploy [APP] [ENVINRONMENT]` to install all requirements for given environment

APP:
- front
- api

ENVIRONMENT:
- dev
- test
- prod

## Build application

Run `./deploy build [APP] [ENVIRONMENT]` to build application

## Start docker

Run `docker-compose up --build` to start containers. 

IMPORTANT: At this stage front application should be build in prod environment before bringing up docker images

## Run localy

Run `mongod` to start local database server. 

Run `./deploy build front dev && cd server && flask run -p 8000` to start frontend server.  

Run `cd flask-api && flask run` to start API.

Go to `https://127.0.0.1:8000` and start using the application. 