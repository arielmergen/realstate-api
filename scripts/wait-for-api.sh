#!/bin/bash

# Script para esperar a que la API esté completamente lista
echo "⏳ Esperando a que la API esté completamente lista..."

# Función para verificar si la API está lista
check_api() {
    local url="http://localhost:5000/realstate"
    local response=$(curl -s -X POST "$url" \
        -H "Content-Type: application/json" \
        -d '{"query": "{ __typename }"}' \
        2>/dev/null)
    
    if echo "$response" | grep -q '"data"'; then
        return 0
    else
        return 1
    fi
}

# Esperar hasta 5 minutos (300 segundos)
max_attempts=60
attempt=1

while [ $attempt -le $max_attempts ]; do
    if check_api; then
        echo "✅ API GraphQL está completamente lista"
        exit 0
    fi
    
    echo "⏳ Esperando API... (intento $attempt/$max_attempts)"
    sleep 5
    attempt=$((attempt + 1))
done

echo "❌ La API no respondió después de 5 minutos"
exit 1
