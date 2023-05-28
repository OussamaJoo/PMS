FROM node:16.13.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package.json .
ENV NODE_ENV=development

COPY --chown=node:node . .
RUN npm install -f --legacy-peer-deps --save-dev

EXPOSE 3000

CMD [ "npm", "start" ]