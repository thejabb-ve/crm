FROM node:20.11.1-alpine3.19
RUN addgroup crm && adduser -S -G crm crm
USER crm
WORKDIR /app/
COPY --chown=crm package*.json .
RUN npm install
COPY --chown=crm . .
EXPOSE 3000
CMD ["npm", "run", "dev"]