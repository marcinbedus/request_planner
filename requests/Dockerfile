FROM node:16-slim as ts-compiler

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /home/node/requests

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . ./

RUN npm run build

FROM node:16-slim as ts-remover

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /home/node/requests

COPY --from=ts-compiler /home/node/requests/package*.json ./
COPY --from=ts-compiler /home/node/requests/dist ./
COPY prisma prisma

RUN npm install --only=production
RUN npx prisma generate

FROM node:16-slim

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /home/node/requests
COPY --from=ts-remover /home/node/requests ./
COPY --from=ts-remover /home/node/requests/prisma ./prisma

RUN apt-get install bash
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

