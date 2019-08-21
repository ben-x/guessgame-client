FROM node:10

COPY ./ /web
WORKDIR /web
ENV VUE_APP_API http://localhost:3001
ENV VUE_APP_BOT_NAME Bot
RUN yarn install
RUN yarn build

FROM nginx
RUN mkdir /web
COPY --from=0 /web/dist /web
COPY nginx.conf /etc/nginx/nginx.conf
