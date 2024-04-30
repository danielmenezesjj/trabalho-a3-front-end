
FROM node:16-alpine AS builder

# Define o diretório de trabalho dentro da imagem
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para a imagem
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila a aplicação React
RUN npm run build

# Usa uma imagem base do Nginx para servir a aplicação
FROM nginx:alpine

# Copia os arquivos compilados da pasta de trabalho do Node.js para o diretório de conteúdo padrão do Nginx
COPY --from=builder /app/build /usr/share/nginx/html


