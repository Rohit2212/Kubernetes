FROM node:14
WORKDIR /app
COPY . .
RUN npm install express mysql body-parser
EXPOSE 8080
CMD ["node", "app.js"]