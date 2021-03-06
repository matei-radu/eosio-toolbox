FROM node:14-alpine AS build
ARG EOSIO_TOOLBOX_BUILD_HASH
COPY . .
RUN npm i -g npm@7
RUN npm install
RUN npm run build

FROM nginx:mainline-alpine
COPY --from=build ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=build ./dist /app/
