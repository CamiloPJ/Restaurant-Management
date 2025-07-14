# Imagen ligera de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Puerto expuesto
EXPOSE 4000

# Comando para iniciar el servidor
CMD ["npm", "start"]