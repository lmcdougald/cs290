FROM node:14-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY main.js /app/main.js
COPY views/ /app/views/
RUN npm install

EXPOSE 2880

ENTRYPOINT ["node", "main.js"]