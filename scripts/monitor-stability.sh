#!/bin/bash

# Script de monitoreo de estabilidad para la API RealState
# Detecta problemas de memoria y reinicia automáticamente si es necesario

API_CONTAINER="realstate-api"
MEMORY_THRESHOLD=85  # Porcentaje de memoria que activa el reinicio
CHECK_INTERVAL=60    # Segundos entre verificaciones

echo "🔍 Iniciando monitoreo de estabilidad para $API_CONTAINER"
echo "📊 Umbral de memoria: ${MEMORY_THRESHOLD}%"
echo "⏱️  Intervalo de verificación: ${CHECK_INTERVAL}s"
echo ""

while true; do
    # Verificar si el contenedor está ejecutándose
    if ! docker ps | grep -q "$API_CONTAINER"; then
        echo "❌ $(date): Contenedor $API_CONTAINER no está ejecutándose. Reiniciando..."
        docker-compose up -d api
        sleep 30
        continue
    fi
    
    # Obtener estadísticas de memoria
    MEMORY_USAGE=$(docker stats --no-stream --format "table {{.MemPerc}}" $API_CONTAINER | tail -n 1 | sed 's/%//')
    
    # Verificar si la memoria está por encima del umbral
    if (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
        echo "⚠️  $(date): Uso de memoria alto: ${MEMORY_USAGE}% (umbral: ${MEMORY_THRESHOLD}%)"
        echo "🔄 Reiniciando contenedor para liberar memoria..."
        
        # Reiniciar el contenedor
        docker-compose restart api
        
        # Esperar a que se estabilice
        echo "⏳ Esperando estabilización..."
        sleep 60
        
        # Verificar que esté funcionando
        if curl -f http://localhost:3002/health-check > /dev/null 2>&1; then
            echo "✅ $(date): Contenedor reiniciado exitosamente"
        else
            echo "❌ $(date): Error al reiniciar contenedor"
        fi
    else
        echo "✅ $(date): Memoria OK: ${MEMORY_USAGE}%"
    fi
    
    # Verificar conectividad
    if ! curl -f http://localhost:3002/health-check > /dev/null 2>&1; then
        echo "❌ $(date): API no responde. Reiniciando..."
        docker-compose restart api
        sleep 30
    fi
    
    sleep $CHECK_INTERVAL
done
