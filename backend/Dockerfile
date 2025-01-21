# Stage 1

FROM node:22 as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY . .
COPY tsconfig.json tsconfig.json

RUN npm run build


# Stage 2

FROM node:22 as runner

RUN apt-get update && apt-get install 

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules/
COPY --from=builder build/dist dist/

EXPOSE 3000

CMD [ "npm", "start" ]