# 🚀 Plan de Implementación Local - API RealState

## 📋 Resumen Ejecutivo

Este documento proporciona un plan paso a paso para implementar la **API RealState** localmente usando Docker. La API está construida con **NestJS**, **GraphQL**, **PostgreSQL** y **Prisma ORM**.

## 🎯 Objetivos

- Configurar el entorno de desarrollo local
- Implementar la API RealState con Docker
- Configurar la base de datos PostgreSQL
- Establecer la integración con Cloudinary
- Probar la funcionalidad completa

## 🏗️ Arquitectura Local

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API RealState │    │   PostgreSQL    │
│   Puerto 3000   │◄──►│   Puerto 3001   │◄──►│   Puerto 5432   │
│                 │    │   (Node.js)     │    │   (Base de      │
└─────────────────┘    └─────────────────┘    │    Datos)       │
                                  │               └─────────────────┘
                                  ▼
                           ┌─────────────────┐
                           │   Cloudinary    │
                           │   (Externo)     │
                           └─────────────────┘
```

## 📦 Prerrequisitos

### Software Requerido
- **Docker** (versión 20.10+)
- **Docker Compose** (versión 2.0+)
- **Git** (para clonar el repositorio)
- **Editor de código** (VS Code recomendado)

### Cuentas Externas
- **Cloudinary** (para gestión de imágenes)
- **GitHub** (repositorio del código)

## 🚀 Implementación Paso a Paso

### Paso 1: Preparación del Entorno

#### 1.1 Clonar el Repositorio
```bash
git clone git@github.com:arielmergen/realstate-api.git
cd realstate-api
```

#### 1.2 Verificar Docker
```bash
docker --version
docker-compose --version
```

### Paso 2: Configuración de Variables de Entorno

#### 2.1 Crear Archivo de Configuración
```bash
cp env.example .env
```

#### 2.2 Configurar Cloudinary
Editar `.env` con tus credenciales:
```env
# Base de datos
DATABASE_URL="postgresql://realstate:realstate123@postgres:5432/realstate_db"

# JWT
JWT_SECRET="realstate-local-secret-key-2024"
TOKEN_VALIDITY_TIME=24
TOKEN_VALIDITY_UNITS="h"
REFRESH_TOKEN_VALIDITY_TIME=7
REFRESH_TOKEN_VALIDITY_UNITS="d"

# Cloudinary (OBLIGATORIO)
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

### Paso 3: Configuración Automática (Recomendada)

#### 3.1 Ejecutar Script de Configuración
```bash
chmod +x setup-local.sh
./setup-local.sh
```

Este script:
- ✅ Verifica Docker
- ✅ Construye las imágenes
- ✅ Inicia los servicios
- ✅ Ejecuta migraciones
- ✅ Configura la base de datos

### Paso 4: Configuración Manual (Alternativa)

#### 4.1 Construir y Ejecutar Servicios
```bash
# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up -d

# Verificar estado
docker-compose ps
```

#### 4.2 Configurar Base de Datos
```bash
# Ejecutar migraciones
docker-compose exec api npx prisma migrate dev

# Generar cliente Prisma
docker-compose exec api npx prisma generate
```

### Paso 5: Verificación del Sistema

#### 5.1 Verificar Servicios
```bash
# Estado de contenedores
docker-compose ps

# Logs de la API
docker-compose logs -f api

# Logs de la base de datos
docker-compose logs -f postgres
```

#### 5.2 Probar Endpoints
- **API GraphQL**: http://localhost:3001/realstate
- **Frontend**: http://localhost:3000 (reservado para tu aplicación)
- **Base de datos**: localhost:5432

#### 5.3 Probar GraphQL
```graphql
query {
  properties {
    id
    title
    price
  }
}
```

## 🔧 Configuración Avanzada

### Base de Datos

#### Acceso Directo
```bash
docker-compose exec postgres psql -U realstate -d realstate_db
```

#### Comandos Útiles
```sql
-- Ver tablas
\dt

-- Ver usuarios
SELECT * FROM "User";

-- Ver propiedades
SELECT * FROM "Property";
```

### Desarrollo

#### Hot Reload
El contenedor de la API está configurado con hot reload:
```bash
# Los cambios se reflejan automáticamente
# No necesitas reiniciar el contenedor
```

#### Logs en Tiempo Real
```bash
# API
docker-compose logs -f api

# Base de datos
docker-compose logs -f postgres

# Todos los servicios
docker-compose logs -f
```

## 📋 Comandos de Referencia Rápida

### Gestión de Servicios
```bash
# Iniciar todo
docker-compose up -d

# Parar todo
docker-compose down

# Reiniciar API
docker-compose restart api

# Ver estado
docker-compose ps
```

### Base de Datos
```bash
# Migraciones
docker-compose exec api npx prisma migrate dev

# Reset de base de datos
docker-compose exec api npx prisma migrate reset

# Generar cliente
docker-compose exec api npx prisma generate

# Studio de Prisma
docker-compose exec api npx prisma studio
```

### Desarrollo
```bash
# Instalar dependencias
docker-compose exec api npm install

# Ejecutar tests
docker-compose exec api npm test

# Linting
docker-compose exec api npm run lint
```

## 🐛 Solución de Problemas

### Puerto en Uso
```bash
# Verificar puertos
lsof -i :3001
lsof -i :5432

# Cambiar puertos en docker-compose.yml si es necesario
```

### Problemas de Base de Datos
```bash
# Reiniciar base de datos
docker-compose restart postgres

# Ver logs de base de datos
docker-compose logs postgres

# Acceder a base de datos
docker-compose exec postgres psql -U realstate -d realstate_db
```

### Problemas de API
```bash
# Reiniciar API
docker-compose restart api

# Ver logs de API
docker-compose logs api

# Reconstruir imagen
docker-compose build api
```

### Limpiar Todo
```bash
# Parar y eliminar contenedores
docker-compose down

# Eliminar volúmenes (CUIDADO: elimina datos)
docker-compose down -v

# Eliminar imágenes
docker-compose down --rmi all
```

## 🔐 Seguridad Local

### Variables de Entorno
- ✅ Nunca commitees el archivo `.env`
- ✅ Usa credenciales de desarrollo para Cloudinary
- ✅ JWT_SECRET es solo para desarrollo local

### Base de Datos
- ✅ Contraseña simple para desarrollo local
- ✅ Acceso solo desde localhost
- ✅ Datos de prueba seguros

## 📊 Monitoreo y Logs

### Logs Disponibles
```bash
# API completa
docker-compose logs api

# Base de datos
docker-compose logs postgres

# Filtros por nivel
docker-compose logs api | grep ERROR
docker-compose logs api | grep WARN
```

### Métricas de Rendimiento
```bash
# Uso de recursos
docker stats

# Espacio en disco
docker system df
```

## 🚀 URLs Importantes

- **API GraphQL**: http://localhost:3001/realstate
- **Frontend**: http://localhost:3000 (reservado para tu aplicación frontend)
- **Base de Datos**: localhost:5432
- **Cloudinary Dashboard**: https://cloudinary.com/console

## 📝 Notas Importantes

1. **Puerto 3000**: Reservado para el frontend
2. **Puerto 3001**: API RealState
3. **Puerto 5432**: PostgreSQL
4. **Cloudinary**: Requerido para funcionalidad completa
5. **Hot Reload**: Habilitado para desarrollo
6. **Persistencia**: Los datos se mantienen entre reinicios

## 🎯 Próximos Pasos

1. **Configurar Cloudinary** con tus credenciales
2. **Ejecutar** `./setup-local.sh`
3. **Probar** la API en http://localhost:3001/realstate
4. **Crear** usuario administrador
5. **¡Comenzar** a desarrollar!

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs -f`
2. Verifica las variables de entorno
3. Asegúrate de que Cloudinary esté configurado
4. Revisa que los puertos estén disponibles

---

**¡La API RealState está lista para desarrollo local!** 🎉