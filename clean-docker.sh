#!/bin/bash

# Script para limpiar solo contenedores específicos de RealState API
echo "🧹 Limpiando contenedores específicos de RealState API..."

# Verificar y eliminar contenedor de PostgreSQL si existe
if docker ps -a --format "table {{.Names}}" | grep -q "realstate-postgres"; then
    echo "   - Eliminando contenedor realstate-postgres..."
    docker container rm -f realstate-postgres 2>/dev/null || true
else
    echo "   - No hay contenedor realstate-postgres existente"
fi

# Verificar y eliminar contenedor de API si existe
if docker ps -a --format "table {{.Names}}" | grep -q "realstate-api"; then
    echo "   - Eliminando contenedor realstate-api..."
    docker container rm -f realstate-api 2>/dev/null || true
else
    echo "   - No hay contenedor realstate-api existente"
fi

# Detener servicios de docker-compose si están ejecutándose
echo "   - Deteniendo servicios de docker-compose..."
docker-compose down -v 2>/dev/null || true

# Mostrar estado final
echo "📊 Estado actual de contenedores RealState:"
docker ps -a --filter "name=realstate" 2>/dev/null || echo "   No hay contenedores realstate"

echo ""
echo "✅ Limpieza completada. Ahora puedes ejecutar ./setup-local.sh sin conflictos."
