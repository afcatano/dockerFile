FROM node:8

# Create app directory
WORKDIR /usr/src/app


LABEL io.openshift.expose-services="8080:http"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install && chgrp -R 0 /* && chmod -R g=u /*
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

USER 1001

CMD [ "npm", "start" ]