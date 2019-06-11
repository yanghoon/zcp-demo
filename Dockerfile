FROM node:10.16-alpine

WORKDIR /app

COPY . .
RUN yarn install && yarn build

ENV HOST 0.0.0.0

EXPOSE 3000
CMD [ "yarn", "start" ]

## Build
# docker build . -t k8s-showcase:init

## Test
# docker run --name showcase -d -p 3000:3000 k8s-showcase:init 
# docker ps
# docker exec -i -t showcase bash
# docker logs showcase

## Clean-up
# docker rm showcase -f
# docker rmi k8s-showcase:init