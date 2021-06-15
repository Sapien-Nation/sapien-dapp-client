FROM node:14.16.0-buster

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
CMD [ "npm", "run", "start" ]