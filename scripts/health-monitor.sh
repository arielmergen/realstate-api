#!/bin/bash

# Monitor de salud proactivo para la API RealState
# Detecta problemas antes de que causen crashes

API_URL="http://localhost:5000"
CHECK_INTERVAL=30
MEMORY_THRESHOLD=80
RESPONSE_TIME_THRESHOLD=5
LOG_FILE="/app/logs/health-monitor.log"

# Crear directorio de logs
mkdir -p /app/logs

# Función de logging
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función para verificar memoria
check_memory() {
    local memory_usage=$(docker stats --no-stream --format "{{.MemPerc}}" realstate-api 2>/dev/null | sed 's/%//')
    if [ -n "$memory_usage" ] && (( $(echo "$memory_usage > $MEMORY_THRESHOLD" | bc -l) )); then
        log_message "⚠️  Uso de memoria alto: ${memory_usage}% (umbral: ${MEMORY_THRESHOLD}%)"
        return 1
    fi
    return 0
}

# Función para verificar tiempo de respuesta
check_response_time() {
    local start_time=$(date +%s.%N)
    if curl -f -s "$API_URL/health-check" > /dev/null 2>&1; then
        local end_time=$(date +%s.%N)
        local response_time=$(echo "$end_time - $start_time" | bc)
        local response_time_ms=$(echo "$response_time * 1000" | bc | cut -d. -f1)
        
        if (( $(echo "$response_time > $RESPONSE_TIME_THRESHOLD" | bc -l) )); then
            log_message "⚠️  Tiempo de respuesta lento: ${response_time_ms}ms (umbral: ${RESPONSE_TIME_THRESHOLD}s)"
            return 1
        fi
        return 0
    else
        log_message "❌ API no responde"
        return 1
    fi
}

# Función para verificar conectividad de base de datos
check_database() {
    if docker exec realstate-postgres pg_isready -U realstate -d realstate_db > /dev/null 2>&1; then
        return 0
    else
        log_message "❌ Base de datos no disponible"
        return 1
    fi
}

# Función para verificar logs de errores
check_error_logs() {
    local error_count=$(docker logs realstate-api --since 5m 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    if [ "$error_count" -gt 10 ]; then
        log_message "⚠️  Muchos errores en logs: $error_count en los últimos 5 minutos"
        return 1
    fi
    return 0
}

# Función principal de monitoreo
monitor_health() {
    log_message "🔍 Iniciando monitoreo de salud (intervalo: ${CHECK_INTERVAL}s)"
    
    local consecutive_failures=0
    local max_consecutive_failures=3
    
    while true; do
        local all_checks_passed=true
        
        # Verificar memoria
        if ! check_memory; then
            all_checks_passed=false
        fi
        
        # Verificar tiempo de respuesta
        if ! check_response_time; then
            all_checks_passed=false
        fi
        
        # Verificar base de datos
        if ! check_database; then
            all_checks_passed=false
        fi
        
        # Verificar logs de errores
        if ! check_error_logs; then
            all_checks_passed=false
        fi
        
        if [ "$all_checks_passed" = true ]; then
            if [ $consecutive_failures -gt 0 ]; then
                log_message "✅ Salud restaurada después de $consecutive_failures fallos consecutivos"
            fi
            consecutive_failures=0
        else
            ((consecutive_failures++))
            log_message "⚠️  Fallo de salud #$consecutive_failures/$max_consecutive_failures"
            
            if [ $consecutive_failures -ge $max_consecutive_failures ]; then
                log_message "🚨 CRÍTICO: Múltiples fallos de salud detectados"
                log_message "💡 Considerar reinicio manual o revisar configuración"
                consecutive_failures=0  # Reset para evitar spam
            fi
        fi
        
        sleep $CHECK_INTERVAL
    done
}

# Ejecutar monitoreo
monitor_health
