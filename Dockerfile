#node image 
FROM node:20-alpine

#created a work directory for code
WORKDIR /usr/src/app

#copying all the package.json and package-lock.js for checking dependency
COPY package*.json ./

#installing the dependency
RUN npm install

#copying all the code and requried files
COPY . .

#exposed to port 3000
EXPOSE 3000

#running node application 
CMD ["node","app.js"]
