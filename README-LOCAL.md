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
```bash
./setup-local.sh
```

#### 🎬 **¿Qué verás al ejecutar `./setup-local.sh`?**

El script te mostrará algo así:

```
🚀 Configurando API RealState para desarrollo local...

✅ Docker está instalado
✅ Archivo .env encontrado
🔨 Construyendo imágenes de Docker...
   - Descargando PostgreSQL...
   - Construyendo API RealState...

🚀 Iniciando servicios...
   - Iniciando base de datos...
   - Iniciando API...

⏳ Esperando a que la base de datos esté lista...
   - Verificando conexión...

📊 Ejecutando migraciones de base de datos...
   - Creando tablas...
   - Configurando datos iniciales...

✅ ¡Configuración completada!

🌐 URLs disponibles:
   - API GraphQL: http://localhost:3001/realstate
   - Frontend: http://localhost:3000 (reservado para tu aplicación frontend)
   - Base de datos: localhost:5432

📋 Comandos útiles:
   - Ver logs: docker-compose logs -f api
   - Parar servicios: docker-compose down
   - Reiniciar API: docker-compose restart api
   - Acceder a base de datos: docker-compose exec postgres psql -U realstate -d realstate_db

🎉 ¡La API RealState está lista para usar!
```

#### ⚠️ **Si algo sale mal:**

**Error: "Docker no está instalado"**
- Instala Docker Desktop desde https://docker.com
- Reinicia tu computadora
- Vuelve a ejecutar `./setup-local.sh`

**Error: "Archivo .env no encontrado"**
- Asegúrate de haber ejecutado `cp env.example .env`
- Verifica que estés en la carpeta correcta

**Error: "Puerto 3001 en uso"**
- Cierra otras aplicaciones que usen el puerto 3001
- O cambia el puerto en `docker-compose.yml`

#### ✅ **¿Cómo saber que funcionó?**

1. **Verás el mensaje final**: "🎉 ¡La API RealState está lista para usar!"
2. **Abre tu navegador** en: http://localhost:3001/realstate
3. **Deberías ver** la interfaz de GraphQL (página con documentación de la API)

### Opción 2: Configuración Manual
```bash
# 1. Crear .env
cp env.example .env
# Editar .env con credenciales de Cloudinary

# 2. Construir y ejecutar
docker-compose up -d

# 3. Configurar base de datos
docker-compose exec api npx prisma migrate dev
```

## ✅ Verificación

- **API GraphQL**: http://localhost:3001/realstate
- **Frontend**: http://localhost:3000 (reservado para tu aplicación frontend)
- **Base de datos**: localhost:5432
- **Logs**: `docker-compose logs -f api`

## 📋 Comandos Útiles

```bash
# Ver logs
docker-compose logs -f api

# Reiniciar API
docker-compose restart api

# Parar todo
docker-compose down

# Acceder a base de datos
docker-compose exec postgres psql -U realstate -d realstate_db
```

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

## 📚 Documentación Completa

Ver `documents/plan-implementacion-local.md` para documentación detallada.

## 🎯 Próximos Pasos

1. Configurar credenciales de Cloudinary
2. Ejecutar `./setup-local.sh`
3. Probar la API en http://localhost:3001/realstate
4. Crear usuario administrador
5. ¡Comenzar a desarrollar!
