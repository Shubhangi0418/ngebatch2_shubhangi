FROM node:16
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 9091
ENTRYPOINT [ "./node_modules/.bin/ts-node", "index.ts" ]
