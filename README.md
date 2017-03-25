# joegarbcom
The code behind joegarb.com

---

## Requirements
- node
- npm
- docker (for production)

## Setup
    npm install

## Run Development Server
    npm start

## Run Production Server
    npm run build
    docker build -t joegarbcom .
    docker rm -f joegarbcom
    docker run -dit -p 80:80 --restart=always --name joegarbcom joegarbcom
