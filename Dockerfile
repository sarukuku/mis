FROM node:10

RUN apt-get update && apt-get install -y \
  curl \
  python \
  bash \
  openssh-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]