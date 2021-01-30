FROM node:14-alpine AS build
ARG EOSIO_TOOLBOX_BUILD_HASH
COPY . .
RUN npm install
RUN npm run build

FROM steebchen/nginx-spa:latest
COPY --from=build ./dist /app/
RUN chmod -R 777 /app
