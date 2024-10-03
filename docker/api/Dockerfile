FROM node:latest

WORKDIR /app/api

COPY api/package*.json ./

RUN npm install

COPY api/ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
