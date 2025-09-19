#!/bin/bash

# Script de reinicio inteligente para la API RealState
# Incluye límites, backoff exponencial y monitoreo de salud

MAX_RESTARTS=10
RESTART_COUNT=0
BASE_DELAY=5
MAX_DELAY=300
CURRENT_DELAY=$BASE_DELAY
LOG_FILE="/app/logs/restart.log"

# Crear directorio de logs si no existe
mkdir -p /app/logs

# Función de logging
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función para verificar si la API está realmente funcionando
check_api_health() {
    local max_attempts=3
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s http://localhost:5000/health-check > /dev/null 2>&1; then
            return 0
        fi
        log_message "Intento $attempt/$max_attempts de health check falló"
        sleep 2
        ((attempt++))
    done
    return 1
}

# Función para calcular delay con backoff exponencial
calculate_delay() {
    if [ $RESTART_COUNT -eq 0 ]; then
        echo $BASE_DELAY
    else
        local delay=$((BASE_DELAY * (2 ** (RESTART_COUNT - 1))))
        if [ $delay -gt $MAX_DELAY ]; then
            echo $MAX_DELAY
        else
            echo $delay
        fi
    fi
}

# Función para reiniciar con límites
restart_api() {
    ((RESTART_COUNT++))
    
    if [ $RESTART_COUNT -gt $MAX_RESTARTS ]; then
        log_message "❌ MÁXIMO DE REINICIOS ALCANZADO ($MAX_RESTARTS). Deteniendo auto-reinicio."
        log_message "🔍 Revisar logs para identificar el problema persistente."
        exit 1
    fi
    
    CURRENT_DELAY=$(calculate_delay)
    log_message "⚠️  Reinicio #$RESTART_COUNT/$MAX_RESTARTS en ${CURRENT_DELAY}s"
    
    sleep $CURRENT_DELAY
    
    log_message "🔄 Iniciando API..."
    npm run start:dev &
    local api_pid=$!
    
    # Esperar a que la API se inicie
    sleep 10
    
    # Verificar si la API está funcionando
    if check_api_health; then
        log_message "✅ API iniciada correctamente (PID: $api_pid)"
        RESTART_COUNT=0  # Resetear contador en caso de éxito
        CURRENT_DELAY=$BASE_DELAY
        wait $api_pid
    else
        log_message "❌ API no responde después del reinicio"
        kill $api_pid 2>/dev/null
        restart_api
    fi
}

# Función principal
main() {
    log_message "🚀 Iniciando sistema de reinicio inteligente"
    log_message "📊 Configuración: Max reinicios=$MAX_RESTARTS, Delay base=${BASE_DELAY}s, Delay max=${MAX_DELAY}s"
    
    # Trap para manejar señales
    trap 'log_message "🛑 Señal recibida, terminando..."; exit 0' SIGTERM SIGINT
    
    while true; do
        log_message "🔄 Iniciando API..."
        npm run start:dev &
        local api_pid=$!
        
        # Esperar a que la API se inicie
        sleep 15
        
        # Verificar salud inicial
        if check_api_health; then
            log_message "✅ API iniciada correctamente (PID: $api_pid)"
            RESTART_COUNT=0
            CURRENT_DELAY=$BASE_DELAY
            wait $api_pid
            local exit_code=$?
            
            if [ $exit_code -eq 0 ]; then
                log_message "✅ API terminó normalmente"
                break
            elif [ $exit_code -eq 143 ]; then
                log_message "⚠️  API terminada por SIGTERM"
                break
            else
                log_message "❌ API terminó con código de error: $exit_code"
                restart_api
            fi
        else
            log_message "❌ API no responde después de la inicialización"
            kill $api_pid 2>/dev/null
            restart_api
        fi
    done
    
    log_message "🏁 Sistema de reinicio terminado"
}

# Ejecutar función principal
main
