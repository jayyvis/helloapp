FROM node:14.4.0-alpine
WORKDIR /app
COPY . /app
RUN npm install --only=prod
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
