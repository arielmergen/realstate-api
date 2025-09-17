#!/bin/bash

# Script de configuración local para API RealState
echo "🚀 Configurando API RealState para desarrollo local..."

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

# Construir y ejecutar contenedores
echo "🔨 Construyendo contenedores..."
docker-compose build

echo "🚀 Iniciando servicios..."
docker-compose up -d

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 10

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones de base de datos..."
docker-compose exec api npx prisma migrate dev --name init

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
docker-compose exec api npx prisma generate

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "🌐 URLs disponibles:"
echo "   - API GraphQL: http://localhost:3001/realstate"
echo "   - Frontend: http://localhost:3000 (reservado para tu aplicación frontend)"
echo "   - Base de datos: localhost:5432"
echo ""
echo "📋 Comandos útiles:"
echo "   - Ver logs: docker-compose logs -f api"
echo "   - Parar servicios: docker-compose down"
echo "   - Reiniciar API: docker-compose restart api"
echo "   - Acceder a base de datos: docker-compose exec postgres psql -U realstate -d realstate_db"
echo ""
echo "🎉 ¡La API RealState está lista para usar!"