#!/bin/bash

# Script de inicio robusto para la API RealState
# Maneja crashes y reinicios automáticos

echo "🚀 Iniciando API RealState con manejo de crashes..."

# Función para reiniciar la API
restart_api() {
    echo "⚠️  API crashed, reiniciando en 5 segundos..."
    sleep 5
    echo "🔄 Reiniciando API..."
    exec npm run start:dev
}

# Configurar trap para manejar señales
trap restart_api SIGTERM SIGINT

# Función principal
start_api() {
    echo "📡 Iniciando servidor de desarrollo..."
    npm run start:dev
}

# Iniciar con manejo de errores
while true; do
    echo "🔄 Iniciando API..."
    start_api
    exit_code=$?
    
    if [ $exit_code -eq 0 ]; then
        echo "✅ API terminó normalmente"
        break
    elif [ $exit_code -eq 139 ]; then
        echo "❌ Segmentation fault detectado (código 139)"
        restart_api
    elif [ $exit_code -eq 143 ]; then
        echo "⚠️  API terminada por SIGTERM"
        break
    else
        echo "❌ API terminó con código de error: $exit_code"
        restart_api
    fi
done

echo "🏁 Script de inicio terminado"
