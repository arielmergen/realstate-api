#!/bin/bash

# Script de configuración local para API RealState
echo "🚀 Configurando API RealState para desarrollo local..."

# Función para limpiar solo contenedores específicos de RealState
clean_realstate_containers() {
    echo "🧹 Verificando contenedores anteriores de RealState..."
    
    # Verificar y eliminar contenedor de PostgreSQL si existe
    if docker ps -a --format "table {{.Names}}" | grep -q "realstate-postgres"; then
        echo "   - Eliminando contenedor realstate-postgres existente..."
        docker container rm -f realstate-postgres 2>/dev/null || true
    else
        echo "   - No hay contenedor realstate-postgres existente"
    fi
    
    # Verificar y eliminar contenedor de API si existe
    if docker ps -a --format "table {{.Names}}" | grep -q "realstate-api"; then
        echo "   - Eliminando contenedor realstate-api existente..."
        docker container rm -f realstate-api 2>/dev/null || true
    else
        echo "   - No hay contenedor realstate-api existente"
    fi
    
    # Detener servicios de docker-compose si están ejecutándose
    echo "   - Deteniendo servicios de docker-compose..."
    docker-compose down -v 2>/dev/null || true
    
    echo "✅ Verificación y limpieza completada"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cp env.example .env
    echo "✅ Archivo .env creado. Por favor configura las credenciales de Cloudinary."
    echo "   Edita el archivo .env y actualiza:"
    echo "   - CLOUDINARY_CLOUD_NAME"
    echo "   - CLOUDINARY_API_KEY" 
    echo "   - CLOUDINARY_API_SECRET"
    echo ""
    echo "   Puedes obtener estas credenciales en: https://cloudinary.com"
    echo ""
    read -p "¿Has configurado las credenciales de Cloudinary? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "⚠️  Por favor configura las credenciales de Cloudinary antes de continuar."
        exit 1
    fi
fi

# Verificar y limpiar solo contenedores específicos de RealState
clean_realstate_containers

# Construir y ejecutar contenedores
echo "🔨 Construyendo contenedores..."
docker-compose build

echo "🚀 Iniciando servicios..."
docker-compose up -d

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 15

# Verificar que PostgreSQL esté funcionando
echo "🔍 Verificando conexión a PostgreSQL..."
for i in {1..30}; do
    if docker-compose exec postgres pg_isready -U realstate -d realstate_db >/dev/null 2>&1; then
        echo "✅ PostgreSQL está listo"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ PostgreSQL no está respondiendo después de 30 intentos"
        echo "📋 Logs de PostgreSQL:"
        docker-compose logs postgres
        exit 1
    fi
    echo "⏳ Esperando PostgreSQL... (intento $i/30)"
    sleep 2
done

# Sincronizar esquema de base de datos (sin crear migraciones)
echo "🗄️  Sincronizando esquema de base de datos..."
if ! docker-compose exec api npx prisma db push; then
    echo "❌ Error sincronizando esquema de base de datos"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
if ! docker-compose exec api npx prisma generate; then
    echo "❌ Error generando cliente Prisma"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Regenerar cliente Prisma con nuevos binaryTargets
echo "🔄 Regenerando cliente Prisma con binaryTargets actualizados..."
if ! docker-compose exec api npx prisma generate; then
    echo "❌ Error regenerando cliente Prisma"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Esperar a que la API esté lista
echo "⏳ Esperando a que la API esté lista..."
sleep 10

# Verificar que la API esté funcionando
echo "🔍 Verificando que la API esté funcionando..."
for i in {1..20}; do
    if curl -s http://localhost:3001/realstate >/dev/null 2>&1; then
        echo "✅ API está funcionando"
        break
    fi
    if [ $i -eq 20 ]; then
        echo "⚠️  API no responde, pero continuando con el seed..."
        break
    fi
    echo "⏳ Esperando API... (intento $i/20)"
    sleep 3
done

# Crear usuarios por defecto
echo "👥 Creando datos completos del sistema..."
if ! docker-compose exec api npm run db:seed; then
    echo "❌ Error ejecutando seed"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "🌐 URLs disponibles:"
echo "   - API GraphQL: http://localhost:3001/realstate"
echo "   - Frontend: http://localhost:3000 (reservado para tu aplicación frontend)"
echo "   - Base de datos: localhost:5432"
echo ""
echo "👤 Usuarios disponibles para testing:"
echo "   - Guest:      guest@realstate.com      / realstate123"
echo "   - Executive:  executive@realstate.com  / realstate123"
echo "   - Admin:      admin@realstate.com      / realstate123"
echo "   - Owner:      owner@realstate.com      / realstate123"
echo ""
echo "📋 Comandos útiles:"
echo "   - Ver logs: docker-compose logs -f api"
echo "   - Parar servicios: docker-compose down"
echo "   - Reiniciar API: docker-compose restart api"
echo "   - Acceder a base de datos: docker-compose exec postgres psql -U realstate -d realstate_db"
echo "   - Recrear usuarios: docker-compose exec api npm run db:seed"
echo ""
echo "🎉 ¡La API RealState está lista para usar!"