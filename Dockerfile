FROM node:16-alpine

WORKDIR /app

# Instalar dependencias del sistema necesarias para Prisma y health checks
RUN apk add --no-cache python3 make g++ curl

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm install

# Copiar código fuente
COPY . .

# Generar cliente Prisma ANTES del build
RUN npx prisma generate

# Generar tipos de GraphQL ANTES del build
RUN npm run graphql:generate

# Compilar código TypeScript (ahora con Prisma y GraphQL generados)
RUN npm run build

# Verificar que la carpeta dist se creó correctamente
RUN ls -la dist/ || echo "Carpeta dist no encontrada"

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Cambiar ownership de los archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Puerto interno de la API (5000)
EXPOSE 5000

# Comando por defecto
CMD ["npm", "run", "start:dev"]