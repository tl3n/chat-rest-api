FROM node:18.20.4 as server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generateMigration

CMD ["npm", "run", "start"]

FROM server as migration

CMD ["npm", "run", "migrate"]