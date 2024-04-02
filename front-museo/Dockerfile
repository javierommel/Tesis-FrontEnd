FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install --force or --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]