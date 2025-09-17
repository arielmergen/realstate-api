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
# Dar permisos de ejecución al archivo
chmod +x setup-local.sh

# Ejecutar el script
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
📝 Creando archivo .env...
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
🗄️ Ejecutando migraciones de base de datos...
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "realstate_db", schema "public" at "postgres:5432"

✅ Generated Prisma Client (v4.15.0) to ./node_modules/.prisma/client in 2.5s
```
*¿Qué hace?* Crea todas las tablas de la base de datos (usuarios, propiedades, etc.)

**PASO 6: Generación del cliente**
```
🔧 Generando cliente Prisma...
```
*¿Qué hace?* Genera el código para conectar la API con la base de datos

**PASO 7: ¡Completado!**
```
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

#### 🔧 **Comandos de verificación rápida:**

```bash
# Verificar que los contenedores estén corriendo
docker-compose ps

# Ver logs de la API
docker-compose logs api

# Probar la API
curl http://localhost:3001/realstate
```

#### 💡 **Tips para desarrolladores junior:**

- **Tiempo total**: 5-10 minutos (dependiendo de tu internet)
- **No cierres la terminal** hasta que termine
- **Si algo falla**, lee el mensaje de error y sigue las instrucciones
- **El script es inteligente**: te guía paso a paso
- **Una vez que funcione**, no necesitas ejecutarlo de nuevo

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
