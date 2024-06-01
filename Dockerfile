# Etapa de construcción
FROM node:latest AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de desarrollo
FROM nginx:alpine AS dev

# Copia los archivos de construcción desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configuración de Nginx para desarrollo
COPY nginx/conf.dev.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

# Etapa de producción
FROM nginx:alpine AS prod

# Copia los archivos de construcción desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configuración de Nginx para producción
COPY nginx/conf.prod.conf /etc/nginx/conf.d/spacyentitylab.conf

# Exponer el puerto para producción
EXPOSE 8081  

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
