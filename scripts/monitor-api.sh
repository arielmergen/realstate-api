#!/bin/bash

# Script para monitorear la API y reiniciarla automáticamente si se desconecta
echo "🔍 Iniciando monitoreo de API RealState..."

# Función para verificar si la API está funcionando
check_api() {
    local response=$(curl -s -X POST "http://localhost:3002/realstate" \
        -H "Content-Type: application/json" \
        -d '{"query": "{ __typename }"}' \
        2>/dev/null)
    
    if echo "$response" | grep -q '"data"'; then
        return 0
    else
        return 1
    fi
}

# Monitoreo continuo
while true; do
    if ! check_api; then
        echo "⚠️  API desconectada detectada - Reiniciando..."
        ./scripts/restart-api.sh
    else
        echo "✅ API funcionando correctamente - $(date)"
    fi
    
    # Esperar 60 segundos antes del siguiente chequeo
    sleep 60
done

