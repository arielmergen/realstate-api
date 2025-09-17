# 🚀 API Orbita - Implementación Local

## Inicio Rápido

### Opción 1: Configuración Automática (Recomendada)
```bash
# 1. Clonar repositorio
git clone git@github.com:arielmergen/realstate-api.git
cd realstate-api

# 2. Configurar Cloudinary (gratuito)
# Ir a https://cloudinary.com y obtener credenciales

# 3. Crear archivo .env
cp env.example .env
# Editar .env con las credenciales de Cloudinary

# 4. Ejecutar configuración automática
./setup-local.sh
```

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

- **API GraphQL**: http://localhost:3001/orbita
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
docker-compose exec postgres psql -U orbita -d orbita_db
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
3. Probar la API en http://localhost:3001/orbita
4. Crear usuario administrador
5. ¡Comenzar a desarrollar!
