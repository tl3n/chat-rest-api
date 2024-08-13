FROM node:18.20.4 as server

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run generateMigration

COPY . .

CMD ["npm", "run", "start"]

FROM base as migration

CMD ["npm", "run", "migrate"]