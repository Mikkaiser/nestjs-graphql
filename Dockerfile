FROM node:16.15.1-alpine

WORKDIR /usr/src


COPY package.json .
COPY package-lock.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD npm run start:dev