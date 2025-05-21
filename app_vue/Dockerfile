FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package*.json ./

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]