FROM node:16-slim as ts-compiler

WORKDIR /home/node/auto_request

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM node:16-slim as ts-remover

WORKDIR /home/node/auto_request

COPY --from=ts-compiler /home/node/auto_request/package*.json ./
COPY --from=ts-compiler /home/node/auto_request/dist ./

RUN npm install --only=production

FROM node:16-slim

WORKDIR /home/node/auto_request
COPY --from=ts-remover /home/node/auto_request ./

RUN apt-get install bash
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh
