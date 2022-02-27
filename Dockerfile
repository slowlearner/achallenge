FROM node:10 as builder
ADD . /src
WORKDIR /src/
RUN npm install
RUN npm run build
ENTRYPOINT ["npm", "start"] 