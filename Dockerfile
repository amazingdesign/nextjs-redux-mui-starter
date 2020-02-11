FROM node as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set '@bit:registry' https://node.bit.dev

RUN npm install

COPY pages pages
COPY src src
COPY public public
COPY env.sh env.sh
COPY .env.example .env

RUN npm run build

RUN npm install --production

### STAGE 2: Production Environment ###
FROM node:13.6.0-alpine3.10

COPY --from=builder /app .

ENV NODE_ENV=production

RUN apk update && apk add bash

CMD npm start -- -p ${PORT:-80}
