FROM mcr.microsoft.com/playwright:v1.65.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV CI=true

CMD ["npm", "test", "--", "--workers=1"]
