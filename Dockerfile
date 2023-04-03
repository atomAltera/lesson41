FROM node:19-alpine3.16

WORKDIR /opt/frontend

ADD ./frontend .
RUN npm install
RUN npm run build

WORKDIR /opt/backend
ADD ./backend .
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["node", "build/main.js"]