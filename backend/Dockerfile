FROM node:18-alpine
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]