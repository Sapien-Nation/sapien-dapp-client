FROM node:14.16.0-buster

WORKDIR /app
COPY . .

RUN npm install

CMD [ "npm", "run", "storybook" ]
