FROM  node:22
WORKDIR /barbeira
COPY  package.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","start"]