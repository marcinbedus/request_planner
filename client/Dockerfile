FROM node:14-alpine3.13 as client-build

WORKDIR  /home/react/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn
COPY . .

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=client-build /home/react/app/build /usr/share/nginx/html
