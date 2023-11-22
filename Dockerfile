FROM node:18

WORKDIR /web_app
COPY .eslintrc.cjs .
COPY vite.config.js .
COPY package.json .
RUN npm install

COPY . .
CMD npm run dev