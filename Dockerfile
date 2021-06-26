FROM node:14.17.1-alpine
WORKDIR /app

COPY . .
COPY .env .env

RUN cat .env
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]