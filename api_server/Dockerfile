FROM node:21

WORKDIR /api_server
COPY . .

RUN chmod +x ./wait-for-it.sh
RUN npm cache clean --force && npm install
RUN npm run build
