# Usa una imagen de Node.js como base
FROM node:18.17.1

# Establece el directorio de trabajo en la aplicación
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY variables.env ./

# Instala las dependencias
RUN npm install


# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 4000

# Comando para iniciar la aplicación usando nodemon
CMD ["npm", "run", "dev"]