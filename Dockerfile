FROM node:18-alpine AS development

# Declaring env
ENV NODE_ENV development

#RUN mkdir site

WORKDIR /reward-service

# Installing dependencies
COPY ./package.json /reward-service

RUN npm install

# Copying all the files in our project
COPY . .

CMD ["npm", "run" "start:dev"]