FROM node:18

RUN npm install -g expo-cli

RUN npm install -g @expo/ngrok

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000 19001 19002

CMD [ "expo","start","--tunnel" ]

