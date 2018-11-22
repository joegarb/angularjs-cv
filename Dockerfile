FROM httpd:2.4

# Setup (install node/npm)
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Build (install npm dependencies and build the app)
COPY . /usr/local/apache2/project/
WORKDIR /usr/local/apache2/project/
RUN npm rebuild node-sass --force && \
    npm install && \
    npm run build

# Deploy (copy built app to apache folder where it will be served from)
RUN cp -a /usr/local/apache2/project/dist/. /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Cleanup (delete source code that was only needed for the build step)
WORKDIR /usr/local/apache2/htdocs/
RUN rm -rf /usr/local/apache2/project

EXPOSE 80
