FROM node:20.11.1-alpine3.19
RUN addgroup multilevel && adduser -S -G multilevel multilevel
USER multilevel
WORKDIR /app/
COPY --chown=multilevel package*.json .
RUN npm install
COPY --chown=multilevel . .
EXPOSE 3000
CMD ["npm", "run", "dev"]