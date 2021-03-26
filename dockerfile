FROM node:14.16.0-buster-slim

RUN mkdir -p /home/app

ENV HOME=/home/app
ENV APP_HOME=/home/app/react
RUN mkdir $APP_HOME

WORKDIR $APP_HOME

ENV PATH $APP_HOME/node_modules/.bin:$PATH

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "start"]
