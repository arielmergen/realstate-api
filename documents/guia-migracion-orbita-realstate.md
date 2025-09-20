# 🏢 Guía de Configuración - API RealState

## 📋 Resumen del Proyecto

Este documento detalla la configuración completa de la **API RealState**, una solución de marca blanca para gestión inmobiliaria construida con tecnologías modernas.

## 🏷️ Configuración de Marca

### Identidad del Proyecto
| **Componente** | **Configuración RealState** |
|---------------|------------------------------|
| **Nombre del Proyecto** | `realstate-api` |
| **Contenedor PostgreSQL** | `realstate-postgres` |
| **Contenedor API** | `realstate-api` |
| **Base de Datos** | `realstate_db` |
| **Usuario DB** | `realstate` |
| **Password DB** | `realstate123` |
| **Red Docker** | `realstate-network` |
| **Endpoint GraphQL** | `/realstate` |
| **Ruta de Despliegue** | `api-realstate` |

### URLs del Sistema
| **Componente** | **URL** |
|---------------|---------|
| **API GraphQL** | http://localhost:3002/api/v1/graphql |
| **Frontend** | http://localhost:3000 (reservado) |
| **Base de Datos** | localhost:5432 |

## 📁 Configuración de Archivos

### 1. **package.json**
```json
{
  "name": "realstate-api",
  "version": "0.0.1",
  "description": "API RealState - Solución de marca blanca para gestión inmobiliaria",
  "author": "",
  "private": true
}
```

### 2. **docker-compose.yml**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    container_name: realstate-postgres
    environment:
      POSTGRES_DB: realstate_db
      POSTGRES_USER: realstate
      POSTGRES_PASSWORD: realstate123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - realstate-network

  api:
    build: .
    container_name: realstate-api
    ports:
      - "3002:5000"
    environment:
      - DATABASE_URL=postgresql://realstate:realstate123@postgres:5432/realstate_db
      - JWT_SECRET=realstate-local-secret-key-2024
    depends_on:
      - postgres
    networks:
      - realstate-network

networks:
  realstate-network:
    driver: bridge
```

### 3. **src/app.module.ts**
```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  path: '/api/v1/graphql',
  bodyParserConfig: false,
  typePaths: ['./**/*.graphql'],
  cors: {
    origin: true,
    credentials: true,
  },
})
```

### 4. **env.example**
```env
# Base de datos
DATABASE_URL="postgresql://realstate:realstate123@postgres:5432/realstate_db"

# JWT
JWT_SECRET="realstate-local-secret-key-2024"
TOKEN_VALIDITY_TIME=24
TOKEN_VALIDITY_UNITS="h"
REFRESH_TOKEN_VALIDITY_TIME=7
REFRESH_TOKEN_VALIDITY_UNITS="d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# Puerto
PORT=3000
NODE_ENV=development
```

### 5. **Scripts de Despliegue**
```bash
# start_server.sh
#!/bin/bash
cd /var/www/html/api-realstate
systemctl start api-realstate

# stop_server.sh
#!/bin/bash
DIRECTORY="/var/www/html/api-realstate"
systemctl stop api-realstate
```

### 6. **appspec.yml**
```yaml
version: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html/api-realstate/
hooks:
  ApplicationStart:
    - location: /scripts/start_server.sh
      timeout: 500
      runas: root
  ApplicationStop:
    - location: /scripts/stop_server.sh
      timeout: 500
      runas: root
```

## 🚀 Proceso de Instalación

### Paso 1: Clonar el Repositorio
```bash
git clone git@github.com:arielmergen/realstate-api.git
cd realstate-api
```

### Paso 2: Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar con tus credenciales
nano .env
```

### Paso 3: Configuración Automática
```bash
# Ejecutar script de configuración
chmod +x setup-local.sh
./setup-local.sh
```

### Paso 4: Configuración Manual (Alternativa)
```bash
# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up -d

# Ejecutar migraciones
docker-compose exec api npx prisma migrate dev
```

### Paso 5: Verificar Funcionamiento
```bash
# Verificar que la API responda
curl http://localhost:3002/api/v1/graphql

# Verificar base de datos
docker-compose exec postgres psql -U realstate -d realstate_db -c "\dt"
```

## ⚠️ Consideraciones Importantes

### 1. **Base de Datos**
- **Credenciales**: Usuario `realstate` con password `realstate123`
- **Nombre de DB**: `realstate_db`
- **Persistencia**: Los datos se mantienen entre reinicios

### 2. **URLs de API**
- **GraphQL endpoint**: `/realstate`
- **Puerto API**: 3001 (externo) → 3000 (interno)
- **Frontend**: Puerto 3000 reservado para tu aplicación

### 3. **Contenedores Docker**
- **PostgreSQL**: `realstate-postgres`
- **API**: `realstate-api`
- **Red**: `realstate-network`
- **Volúmenes**: Datos persistentes en `postgres_data`

### 4. **Despliegue**
- **Ruta de servidor**: `/var/www/html/api-realstate/`
- **Servicio del sistema**: `api-realstate`
- **CI/CD**: Configurado para AWS CodeBuild/CodeDeploy

## 🔧 Scripts de Utilidad

### Script de Configuración Automática
```bash
#!/bin/bash
# setup-realstate.sh

echo "🚀 Configurando API RealState..."

# 1. Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

# 2. Construir imágenes
echo "🔨 Construyendo imágenes..."
docker-compose build

# 3. Iniciar servicios
echo "🚀 Iniciando servicios..."
docker-compose up -d

# 4. Esperar base de datos
echo "⏳ Esperando base de datos..."
sleep 30

# 5. Ejecutar migraciones
echo "📊 Ejecutando migraciones..."
docker-compose exec api npx prisma migrate dev

# 6. Verificar
echo "✅ Verificando instalación..."
docker-compose ps
curl -f http://localhost:3002/api/v1/graphql || echo "❌ Error: API no responde"

echo "🎉 ¡API RealState configurada!"
echo "🌐 API: http://localhost:3002/api/v1/graphql"
```

### Script de Backup
```bash
#!/bin/bash
# backup-realstate.sh

echo "📦 Creando backup de RealState..."

# Crear backup de base de datos
docker-compose exec postgres pg_dump -U realstate -d realstate_db > backup_realstate_$(date +%Y%m%d_%H%M%S).sql

echo "✅ Backup completado"
```

### Script de Restauración
```bash
#!/bin/bash
# restore-realstate.sh

echo "📥 Restaurando backup de RealState..."

# Restaurar desde backup más reciente
LATEST_BACKUP=$(ls -t backup_realstate_*.sql | head -n1)
docker-compose exec -T postgres psql -U realstate -d realstate_db < $LATEST_BACKUP

echo "✅ Restauración completada"
```

## 📊 Verificación del Sistema

### Checklist de Verificación
- [ ] **API responde**: `curl http://localhost:3002/api/v1/graphql`
- [ ] **Base de datos conectada**: `docker-compose exec postgres psql -U realstate -d realstate_db`
- [ ] **Datos disponibles**: Verificar que las tablas contengan datos
- [ ] **Autenticación funciona**: Probar login con usuarios
- [ ] **GraphQL queries**: Probar queries básicas
- [ ] **Imágenes**: Verificar que Cloudinary funcione
- [ ] **Logs limpios**: Sin errores en `docker-compose logs`

### Comandos de Verificación
```bash
# Verificar API
curl -X POST http://localhost:3002/api/v1/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name } } }"}'

# Verificar base de datos
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT COUNT(*) FROM \"User\";"

# Verificar contenedores
docker-compose ps

# Verificar logs
docker-compose logs --tail=50 api
```

## 🎯 Beneficios de RealState

### 1. **Marca Blanca**
- ✅ Nombre genérico y comercial
- ✅ Fácil de personalizar para clientes
- ✅ Sin referencias a marca específica

### 2. **Escalabilidad**
- ✅ Preparado para múltiples clientes
- ✅ Configuración flexible
- ✅ Fácil mantenimiento

### 3. **Profesionalismo**
- ✅ Nombre profesional
- ✅ Mejor posicionamiento comercial
- ✅ Mayor versatilidad

## 📞 Soporte Técnico

### Problemas Comunes
1. **API no responde**: Verificar que el puerto 3001 esté libre
2. **Base de datos no conecta**: Verificar credenciales en `.env`
3. **Datos no aparecen**: Verificar que las migraciones se ejecutaron
4. **Imágenes no cargan**: Verificar configuración de Cloudinary

### Recursos de Ayuda
- **Logs**: `docker-compose logs -f`
- **Estado**: `docker-compose ps`
- **Base de datos**: `docker-compose exec postgres psql -U realstate -d realstate_db`

---

**¡La API RealState está lista para producción!** 🚀
