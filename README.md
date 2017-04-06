# joegarbcom
The code behind joegarb.com

---

## Requirements
- node
- npm
- docker (for production)
- docker-compose (for HTTPS in production)

## Setup
    npm install

## Run Development Server
    npm start

## Run Production Server
    npm run build
    docker build -t joegarbcom .
    docker rm -f joegarbcom
    docker run -dit -p 80:80 --name joegarbcom joegarbcom

## Set up HTTPS

Instructions: https://bitbucket.org/automationlogic/le-docker-compose
