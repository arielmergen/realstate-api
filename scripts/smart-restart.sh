#!/bin/bash

# Script mejorado compatible con Docker healthcheck
# Evita conflictos con el health check de Docker

LOG_FILE="/app/logs/restart.log"
PID_FILE="/app/.api.pid"

# Crear directorio de logs si no existe
mkdir -p /app/logs

# Función de logging
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función para limpiar procesos huérfanos
cleanup() {
    log_message "🧹 Limpiando procesos..."
    if [ -f "$PID_FILE" ]; then
        local old_pid=$(cat "$PID_FILE")
        if kill -0 "$old_pid" 2>/dev/null; then
            kill "$old_pid"
            sleep 2
        fi
        rm -f "$PID_FILE"
    fi
}

# Función para verificar si ya hay una instancia corriendo
is_api_running() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        fi
    fi
    return 1
}

# Manejar señales de terminación
handle_signal() {
    log_message "🛑 Señal de terminación recibida"
    cleanup
    exit 0
}

trap handle_signal SIGTERM SIGINT

# Función principal simplificada
main() {
    log_message "🚀 Iniciando API con manejo simplificado"
    
    # Limpiar cualquier proceso anterior
    cleanup
    
    # Iniciar la API una sola vez
    log_message "🔄 Iniciando npm run start:dev..."
    npm run start:dev &
    local api_pid=$!
    
    # Guardar PID
    echo $api_pid > "$PID_FILE"
    log_message "✅ API iniciada con PID: $api_pid"
    
    # Esperar a que termine (sin reinicios automáticos)
    wait $api_pid
    local exit_code=$?
    
    log_message "🏁 API terminó con código: $exit_code"
    cleanup
    exit $exit_code
}

main