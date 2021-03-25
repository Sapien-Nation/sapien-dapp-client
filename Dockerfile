FROM node:14.16.0-buster

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
