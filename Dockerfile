FROM node:latest

COPY ./ /build
WORKDIR /build
RUN rm -rf node_modules
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=0 /build/dist/ /usr/share/nginx/html