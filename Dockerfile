FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_APIKEY
ENV VITE_APIKEY=$VITE_APIKEY

RUN echo "VITE_APIKEY=$VITE_APIKEY" > .env

RUN yarn build

EXPOSE 3000

ENV PORT=3000

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "3000"]