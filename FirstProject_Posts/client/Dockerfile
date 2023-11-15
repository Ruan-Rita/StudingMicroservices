FROM node:18-alpine AS base

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"


CMD ["npm", "run", "start"]