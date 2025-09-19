#!/bin/bash

# Script para solucionar problemas con la carpeta dist
echo "🔧 Solucionando problemas con la carpeta dist..."

# Verificar si el contenedor está ejecutándose
if ! docker-compose ps | grep -q "realstate-api.*Up"; then
    echo "❌ El contenedor de la API no está ejecutándose"
    exit 1
fi

# Verificar si la carpeta dist existe
if docker-compose exec api test -d "dist"; then
    echo "✅ Carpeta dist existe"
    
    # Verificar si tiene contenido
    if [ "$(docker-compose exec api find dist -type f | wc -l)" -gt 0 ]; then
        echo "✅ Carpeta dist tiene contenido"
    else
        echo "⚠️  Carpeta dist está vacía, recompilando..."
        docker-compose exec api npm run build
    fi
else
    echo "⚠️  Carpeta dist no existe, recompilando..."
    docker-compose exec api npm run build
fi

# Verificar que el build fue exitoso
if docker-compose exec api test -d "dist" && [ "$(docker-compose exec api find dist -type f | wc -l)" -gt 0 ]; then
    echo "✅ Problema de carpeta dist solucionado"
else
    echo "❌ Error al solucionar la carpeta dist"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

