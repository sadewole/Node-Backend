FROM node:12.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 5000


CMD ["npm", "start"]