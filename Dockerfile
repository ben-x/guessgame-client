FROM node:10
COPY ./ /web
WORKDIR /web
RUN npm install && npm run build

FROM nginx
RUN mkdir /web
COPY --from=0 /web/dist /web
COPY nginx.conf /etc/nginx/nginx.conf
