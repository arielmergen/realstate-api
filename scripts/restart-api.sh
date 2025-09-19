#!/bin/bash

# Script para reiniciar la API cuando se detecta desconexión
echo "🔄 Reiniciando API RealState..."

# Detener contenedor si está corriendo
docker-compose stop api

# Esperar un momento
sleep 5

# Iniciar contenedor
docker-compose up -d api

# Esperar a que esté listo
echo "⏳ Esperando a que la API esté lista..."
sleep 30

# Verificar que esté funcionando
if curl -f http://localhost:3002/health-check > /dev/null 2>&1; then
    echo "✅ API reiniciada exitosamente"
    echo "📊 GraphQL Playground: http://localhost:3002/realstate"
else
    echo "❌ Error al reiniciar la API"
    exit 1
fi

