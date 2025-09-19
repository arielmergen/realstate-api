# 🚀 API RealState - Implementación Local

## Inicio Rápido

### Opción 1: Configuración Automática (Recomendada)

#### 📋 **Paso a Paso para Principiantes**

**1. Clonar el repositorio**
```bash
git clone git@github.com:arielmergen/realstate-api.git
cd realstate-api
```

**2. Configurar Cloudinary (gratuito)**
- Ve a https://cloudinary.com
- Crea una cuenta gratuita
- En el Dashboard, copia:
  - Cloud Name
  - API Key  
  - API Secret

**3. Crear archivo de configuración**
```bash
cp env.example .env
```

**4. Editar el archivo .env**
Abre el archivo `.env` con cualquier editor de texto y reemplaza:
```env
CLOUDINARY_CLOUD_NAME="tu-cloud-name"        # ← Pon aquí tu Cloud Name
CLOUDINARY_API_KEY="tu-api-key"              # ← Pon aquí tu API Key
CLOUDINARY_API_SECRET="tu-api-secret"        # ← Pon aquí tu API Secret
```

**5. Ejecutar el script de configuración automática**

#### 🎯 **¿Qué es un archivo .sh?**
Un archivo `.sh` es un **script de Bash** - un programa que ejecuta comandos automáticamente. Es como una receta que le dice a tu computadora exactamente qué hacer paso a paso.

#### 🚀 **Cómo ejecutar el script:**

**Opción A: Desde la terminal (Recomendada)**
```bash
# 1. Navegar a la carpeta del proyecto si no te encuentras en ella
cd realstate-api

# 2. Verificar que estás en el lugar correcto
ls
# Debes ver: package.json, docker-compose.yml, setup-local.sh, etc.

# 3. Dar permisos de ejecución
chmod +x setup-local.sh

# 4. Ejecutar el script
./setup-local.sh
```

**Opción B: Si tienes problemas con permisos**
```bash
# Ejecutar directamente con bash
bash setup-local.sh
```

**Opción C: En Windows (Git Bash o WSL)**
```bash
# Usar bash explícitamente
bash ./setup-local.sh
```

#### 🎬 **Paso a Paso: Lo que verás durante la instalación**

**PASO 1: Verificación inicial**
```
🚀 Configurando API RealState para desarrollo local...

✅ Docker está instalado
✅ Docker Compose está instalado
```
*¿Qué hace?* Verifica que tengas Docker instalado (necesario para ejecutar la API)

**PASO 2: Configuración del archivo .env**
```
�� Creando archivo .env...
✅ Archivo .env creado. Por favor configura las credenciales de Cloudinary.
   Edita el archivo .env y actualiza:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

   Puedes obtener estas credenciales en: https://cloudinary.com

¿Has configurado las credenciales de Cloudinary? (y/n):
```
*¿Qué hace?* Crea el archivo de configuración y te pregunta si ya configuraste Cloudinary

**PASO 3: Construcción de contenedores**
```
🔨 Construyendo contenedores...
[Líneas de descarga y construcción...]
```
*¿Qué hace?* Descarga PostgreSQL y construye la imagen de la API (puede tomar 2-5 minutos)

**PASO 4: Inicio de servicios**
```
🚀 Iniciando servicios...
Creating realstate-postgres ... done
Creating realstate-api ... done
```
*¿Qué hace?* Inicia la base de datos y la API en contenedores separados

**PASO 5: Configuración de la base de datos**
```
⏳ Esperando a que PostgreSQL esté listo...
🗄️ Sincronizando esquema de base de datos...
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "realstate_db", schema "public" at "postgres:5432"

✅ Generated Prisma Client (v4.15.0) to ./node_modules/.prisma/client in 2.5s
```
*¿Qué hace?* Sincroniza el esquema con la base de datos (crea tablas sin generar archivos de migración)

**PASO 6: Generación del cliente**
```
🔧 Generando cliente Prisma...
```
*¿Qué hace?* Genera el código para conectar la API con la base de datos

**PASO 7: Creación de datos completos del sistema**
```
👥 Creando datos completos del sistema...
🌱 Iniciando seed completo de RealState API...

📋 Creando roles...
✅ Roles creados/verificados

👥 Creando usuarios...
✅ Usuarios creados/verificados

⚙️ Creando configuración general...
✅ Configuración general creada

🏠 Creando tipos de propiedades...
✅ Tipos de propiedades creados

🏊 Creando amenidades...
✅ Amenidades creadas

🔧 Creando servicios...
✅ Servicios creados

🗺️ Creando zonas geográficas...
✅ Zonas geográficas creadas

🏘️ Creando emprendimientos...
✅ Emprendimientos creados

🏘️ Creando barrios...
✅ Barrios creados

👨‍💼 Creando propietarios...
✅ Propietarios creados

🏠 Creando configuración del home...
✅ Configuración del home creada

🎉 ¡Seed completo finalizado!

📊 Resumen de datos creados:
┌─────────────────────────┬─────────┐
│ Componente              │ Cantidad│
├─────────────────────────┼─────────┤
│ Roles                   │ 4       │
│ Usuarios                │ 4       │
│ Configuración General   │ 1       │
│ Tipos de Propiedades    │ 6       │
│ Amenidades              │ 12      │
│ Servicios               │ 8       │
│ Zonas Geográficas       │ 7       │
│ Emprendimientos         │ 5       │
│ Barrios                 │ 5       │
│ Propietarios            │ 4       │
│ Configuración Home      │ 1       │
└─────────────────────────┴─────────┘

👤 Usuarios disponibles:
┌─────────────────────────────────────────────────────────┐
│ ROL        │ EMAIL                    │ PASSWORD        │
├─────────────────────────────────────────────────────────┤
│ Guest      │ guest@realstate.com      │ realstate123    │
│ Executive  │ executive@realstate.com  │ realstate123    │
│ Admin      │ admin@realstate.com      │ realstate123    │
│ Owner      │ owner@realstate.com      │ realstate123    │
└─────────────────────────────────────────────────────────┘
```
*¿Qué hace?* Crea **57+ registros** de datos esenciales: usuarios, roles, catálogos, estructura geográfica, propietarios y configuración completa del sistema

**PASO 8: ¡Completado!**
```
✅ ¡Configuración completada!

�� URLs disponibles:
   - API GraphQL: http://localhost:3001/realstate
   - Frontend: http://localhost:3000 (reservado para tu aplicación frontend)
   - Base de datos: localhost:5432

👤 Usuarios disponibles para testing:
   - Guest:      guest@realstate.com      / realstate123
   - Executive:  executive@realstate.com  / realstate123
   - Admin:      admin@realstate.com      / realstate123
   - Owner:      owner@realstate.com      / realstate123

📋 Comandos útiles:
   - Ver logs: docker-compose logs -f api
   - Parar servicios: docker-compose down
   - Reiniciar API: docker-compose restart api
   - Acceder a base de datos: docker-compose exec postgres psql -U realstate -d realstate_db
   - Recrear usuarios: docker-compose exec api npm run db:seed

🎉 ¡La API RealState está lista para usar!
```

#### ⚠️ **Posibles problemas y soluciones:**

**Error: "Permission denied"**
```bash
# Solución: Dar permisos de ejecución
chmod +x setup-local.sh
./setup-local.sh
```

**Error: "Docker no está instalado"**
- Instala Docker Desktop desde https://docker.com
- Reinicia tu computadora
- Vuelve a ejecutar el script

**Error: "Puerto 3001 en uso"**
- Cierra otras aplicaciones que usen el puerto 3001
- O cambia el puerto en `docker-compose.yml`

**Error: "Archivo .env no encontrado"**
- El script lo crea automáticamente
- Si persiste, ejecuta: `cp env.example .env`

**El script se queda "colgado" en migraciones**
- Presiona `Ctrl+C` para cancelar
- Ejecuta: `docker-compose down`
- Vuelve a ejecutar: `./setup-local.sh`

#### ✅ **¿Cómo saber que funcionó perfectamente?**

1. **Verás el mensaje final**: "🎉 ¡La API RealState está lista para usar!"
2. **Abre tu navegador** en: http://localhost:3001/realstate
3. **Deberías ver** una página con documentación de GraphQL
4. **No debe haber errores** en rojo en la terminal
5. **Verás la tabla de usuarios** creados automáticamente

#### 🔧 **Comandos de verificación rápida:**

```bash
# Verificar que los contenedores estén corriendo
docker-compose ps

# Ver logs de la API
docker-compose logs api

# Probar la API
curl http://localhost:3001/realstate

# Ver usuarios creados
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT email, \"firstName\", \"lastName\" FROM \"User\";"
```

#### 💡 **Tips para desarrolladores junior:**

- **Tiempo total**: 5-10 minutos (dependiendo de tu internet)
- **No cierres la terminal** hasta que termine
- **Si algo falla**, lee el mensaje de error y sigue las instrucciones
- **El script es inteligente**: te guía paso a paso
- **Una vez que funcione**, no necesitas ejecutarlo de nuevo
- **Tienes 57+ registros** de datos listos para usar inmediatamente
- **Puedes crear propiedades** desde el primer momento
- **Tienes catálogos completos** (tipos, amenidades, servicios)
- **Estructura geográfica** lista para geolocalizar propiedades

### Opción 2: Configuración Manual
```bash
# 1. Crear .env
cp env.example .env
# Editar .env con credenciales de Cloudinary

# 2. Construir y ejecutar
docker-compose up -d

# 3. Configurar base de datos
docker-compose exec api npx prisma db push

# 4. Crear usuarios por defecto
docker-compose exec api npm run db:seed
```

## �� **Usuarios por Defecto**

La API viene con **4 usuarios de prueba** listos para usar:

| **Rol** | **Email** | **Password** | **Permisos** |
|---------|-----------|--------------|--------------|
| **Guest** | `guest@realstate.com` | `realstate123` | Solo lectura de propiedades públicas |
| **Executive** | `executive@realstate.com` | `realstate123` | CRUD de propiedades, gestión de contactos |
| **Admin** | `admin@realstate.com` | `realstate123` | Acceso completo al sistema |
| **Owner** | `owner@realstate.com` | `realstate123` | Acceso total + gestión de usuarios |

### **¿Cómo usar estos usuarios?**

**1. En GraphQL Playground:**
- Ve a http://localhost:3001/realstate
- Usa cualquiera de los emails/passwords de arriba

**2. En tu aplicación frontend:**
- Usa estos usuarios para hacer login
- Cada uno tendrá diferentes permisos según su rol

**3. Para recrear usuarios:**
```bash
# Si necesitas recrear los usuarios
docker-compose exec api npm run db:seed
```

## 📊 **Datos Creados Automáticamente**

La API RealState se inicializa con **57+ registros** de datos esenciales listos para usar:

| **Componente** | **Cantidad** | **Descripción** |
|----------------|--------------|-----------------|
| **Roles** | 4 | Guest, Executive, Admin, Owner |
| **Usuarios** | 4 | Usuarios de prueba con contraseña `realstate123` |
| **Configuración General** | 1 | Datos de la empresa, redes sociales, contacto |
| **Tipos de Propiedades** | 6 | Casa, Departamento, Oficina, Local Comercial, Terreno, Cochera |
| **Amenidades** | 12 | Piscina, Gimnasio, Parque, Seguridad 24hs, Cochera, Balcón, Terraza, Jardín, Sum, Lavadero, Quincho, Sala de Juegos |
| **Servicios** | 8 | Mantenimiento, Limpieza, Conserjería, Lavandería, Delivery, Vigilancia, Jardinería, Piscina |
| **Zonas Geográficas** | 7 | Centro, Norte, Sur, Este, Oeste, Zona Norte, Zona Sur |
| **Emprendimientos** | 5 | Torres del Centro, Residencial Norte, Complejo Sur, Urbanización Este, Barrio Oeste |
| **Barrios** | 5 | Barrio Centro, Barrio Norte, Barrio Sur, Barrio Este, Barrio Oeste |
| **Propietarios** | 4 | Propietarios de ejemplo para asignar a propiedades |
| **Configuración Home** | 1 | Configuración de la página principal |

### **¿Por qué es importante?**

- ✅ **No necesitas configurar** datos base manualmente
- ✅ **Puedes crear propiedades** inmediatamente
- ✅ **Tienes catálogos completos** para todas las funcionalidades
- ✅ **Estructura geográfica** lista para geolocalizar propiedades
- ✅ **Propietarios disponibles** para asignar a propiedades
- ✅ **Configuración de empresa** lista para el frontend

### **Verificar datos creados:**
```bash
# Ver resumen de todos los datos
docker-compose exec postgres psql -U realstate -d realstate_db -c "
SELECT 'Roles' as tabla, count(*) as cantidad FROM \"Role\"
UNION ALL
SELECT 'Usuarios', count(*) FROM \"User\"
UNION ALL
SELECT 'Tipos de Propiedades', count(*) FROM \"PropertyType\"
UNION ALL
SELECT 'Amenidades', count(*) FROM \"Amenity\"
UNION ALL
SELECT 'Servicios', count(*) FROM \"Service\"
UNION ALL
SELECT 'Zonas', count(*) FROM \"Zone\"
UNION ALL
SELECT 'Emprendimientos', count(*) FROM \"Entrepreneurship\"
UNION ALL
SELECT 'Barrios', count(*) FROM \"Neighborhood\"
UNION ALL
SELECT 'Propietarios', count(*) FROM \"Owner\";
"
```

## ✅ Verificación

- **API GraphQL**: http://localhost:3001/realstate
- **Frontend**: http://localhost:3000 (reservado para tu aplicación frontend)
- **Base de datos**: localhost:5432
- **Logs**: `docker-compose logs -f api`

## 📋 Comandos Útiles

### 🔧 **Comandos Básicos**
```bash
# Ver logs
docker-compose logs -f api

# Reiniciar API
docker-compose restart api

# Parar todo
docker-compose down

# Acceder a base de datos
docker-compose exec postgres psql -U realstate -d realstate_db

# Recrear usuarios por defecto
docker-compose exec api npm run db:seed
```

### 🛠️ **Scripts de Diagnóstico y Monitoreo**

#### **Diagnóstico Completo**
```bash
# Ejecutar diagnóstico completo del sistema
./scripts/diagnostico-api.sh
```
*Verifica: Docker, contenedores, puertos, conectividad, logs, recursos, base de datos, configuración*

#### **Monitoreo en Tiempo Real**
```bash
# Monitoreo continuo (cada 30 segundos)
./scripts/monitoreo-continuo.sh

# Monitoreo más frecuente (cada 10 segundos)
./scripts/monitoreo-continuo.sh 10
```
*Monitorea: API, health checks, memoria, CPU, errores, conexiones de BD, espacio en disco*

#### **Reinicio Inteligente**
```bash
# Reinicio automático basado en el estado del sistema
./scripts/reinicio-inteligente.sh
```
*Decide automáticamente entre reinicio suave o completo según: uso de memoria, errores, estado de la API*

#### **Aplicar Mejoras de Estabilidad**
```bash
# Aplicar todas las mejoras de estabilidad automáticamente
./scripts/aplicar-mejoras.sh
```
*Incluye: configuración optimizada, límites de recursos, monitoreo mejorado, health checks*

### 🌐 **Endpoints de Monitoreo**

#### **Health Check Detallado**
```bash
# Estado de salud completo
curl http://localhost:3001/health-check | jq .

# Respuesta esperada:
# {
#   "status": "ok",
#   "uptime": 1234.56,
#   "memory": {
#     "used": 31,
#     "total": 35,
#     "percentage": 89
#   },
#   "timestamp": "2025-09-19T04:43:07.620Z"
# }
```

#### **Métricas del Sistema**
```bash
# Métricas detalladas de rendimiento
curl http://localhost:3001/metrics | jq .

# Respuesta esperada:
# {
#   "uptime": 1234.56,
#   "memory": {
#     "rss": 80,
#     "heapTotal": 35,
#     "heapUsed": 31,
#     "external": 1
#   },
#   "cpu": {
#     "user": 1045879,
#     "system": 283133
#   },
#   "timestamp": "2025-09-19T04:43:14.586Z",
#   "nodeVersion": "v16.20.2",
#   "platform": "linux"
# }
```

#### **Estado Básico**
```bash
# Estado simple del servicio
curl http://localhost:3001/status | jq .

# Respuesta esperada:
# {
#   "status": "ok",
#   "uptime": 1234.56,
#   "timestamp": "2025-09-19T04:43:23.855Z",
#   "service": "realstate-api"
# }
```

### 🔍 **Comandos de Verificación Rápida**

#### **Verificar Estado General**
```bash
# Estado de contenedores
docker-compose ps

# Uso de recursos
docker stats --no-stream realstate-api realstate-postgres

# Verificar puertos
lsof -i :3001
lsof -i :5433
```

#### **Verificar Conectividad**
```bash
# Probar GraphQL (debe mostrar "GET query missing")
curl http://localhost:3001/realstate

# Probar health check
curl http://localhost:3001/health-check

# Probar métricas
curl http://localhost:3001/metrics
```

#### **Verificar Base de Datos**
```bash
# Conexiones activas
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';"

# Estado de la base de datos
docker-compose exec postgres pg_isready -U realstate -d realstate_db

# Ver usuarios
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT email, \"firstName\", \"lastName\" FROM \"User\";"
```

### 🚨 **Comandos de Emergencia**

#### **Si la API no responde**
```bash
# 1. Diagnóstico rápido
./scripts/diagnostico-api.sh

# 2. Reinicio inteligente
./scripts/reinicio-inteligente.sh

# 3. Si persiste, reinicio completo
docker-compose down && docker-compose up -d
```

#### **Si hay problemas de memoria**
```bash
# Ver uso actual
docker stats realstate-api

# Reinicio inteligente (decide automáticamente)
./scripts/reinicio-inteligente.sh

# Reinicio completo si es necesario
docker-compose down -v && docker-compose up -d
```

#### **Si hay errores en logs**
```bash
# Ver errores recientes
docker-compose logs --tail=50 api | grep -i error

# Ver logs en tiempo real
docker-compose logs -f api

# Limpiar logs y reiniciar
docker-compose down && docker-compose up -d
```

### 📊 **Comandos de Análisis**

#### **Análisis de Rendimiento**
```bash
# Monitoreo continuo por 5 minutos
timeout 300 ./scripts/monitoreo-continuo.sh 10

# Ver logs de rendimiento
docker-compose logs api | grep -E "(memory|cpu|performance)"

# Análisis de conexiones de BD
docker-compose exec postgres psql -U realstate -d realstate_db -c "
SELECT 
  state,
  count(*) as connections,
  max(now() - query_start) as max_duration
FROM pg_stat_activity 
WHERE datname = 'realstate_db'
GROUP BY state;
"
```

#### **Análisis de Errores**
```bash
# Contar errores por tipo
docker-compose logs api | grep -i error | sort | uniq -c | sort -nr

# Errores de las últimas 24 horas
docker-compose logs --since 24h api | grep -i error

# Errores de GraphQL específicamente
docker-compose logs api | grep -i "graphql\|apollo"
```

### 💡 **Tips de Uso**

- **Para desarrollo diario**: Usa `./scripts/diagnostico-api.sh` para verificar que todo esté bien
- **Para monitoreo continuo**: Usa `./scripts/monitoreo-continuo.sh` durante pruebas intensivas
- **Para problemas**: Usa `./scripts/reinicio-inteligente.sh` antes de hacer reinicio manual
- **Para actualizaciones**: Usa `./scripts/aplicar-mejoras.sh` cuando se publiquen nuevas mejoras

## 🔧 Solución de Problemas

### Puerto en uso
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:3000"  # Puerto externo:interno
```

**Nota**: El puerto 3000 está reservado para el frontend. La API usa el puerto 3001.

### Error de base de datos
```bash
# Resetear base de datos
docker-compose exec api npx prisma migrate reset
```

### Error de Cloudinary
- Verificar credenciales en `.env`
- Verificar que la cuenta esté activa

### Problemas con usuarios
```bash
# Recrear usuarios por defecto
docker-compose exec api npm run db:seed

# Ver usuarios existentes
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT email, \"firstName\", \"lastName\" FROM \"User\";"
```

## 📚 Documentación Completa

Ver `documents/plan-implementacion-local.md` para documentación detallada.

## 🎯 Próximos Pasos

1. Configurar credenciales de Cloudinary
2. Ejecutar `./setup-local.sh`
3. Probar la API en http://localhost:3001/realstate
4. **¡Usar los usuarios por defecto para probar!**
5. ¡Comenzar a desarrollar!
