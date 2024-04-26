FROM node:18-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install --production --force

COPY . .

RUN npm run build --prod

EXPOSE 3000

CMD ["npm", "start"]
