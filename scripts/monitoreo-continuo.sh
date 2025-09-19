#!/bin/bash

# Script de monitoreo continuo para API RealState
# Uso: ./scripts/monitoreo-continuo.sh [intervalo_en_segundos]

echo "📊 MONITOREO CONTINUO DE API REALSTATE"
echo "======================================"
echo ""

# Configuración
INTERVAL=${1:-30}  # Intervalo por defecto: 30 segundos
API_PORT=$(grep "API_PORT=" .env 2>/dev/null | cut -d'=' -f2 || echo "3001")
LOG_FILE="monitoring.log"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log_message() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $message" | tee -a "$LOG_FILE"
}

# Función para mostrar estado
show_status() {
    local status=$1
    local message=$2
    local timestamp=$(date '+%H:%M:%S')
    
    if [ "$status" = "OK" ]; then
        echo -e "[$timestamp] ${GREEN}✅ $message${NC}"
    elif [ "$status" = "WARNING" ]; then
        echo -e "[$timestamp] ${YELLOW}⚠️  $message${NC}"
    else
        echo -e "[$timestamp] ${RED}❌ $message${NC}"
    fi
}

# Función para verificar API
check_api() {
    if curl -s -f http://localhost:$API_PORT/realstate >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Función para verificar health check
check_health() {
    if curl -s -f http://localhost:$API_PORT/health-check >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Función para obtener estadísticas
get_stats() {
    local container_name="realstate-api"
    if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
        docker stats --no-stream --format "{{.CPUPerc}},{{.MemUsage}},{{.MemPerc}}" "$container_name" 2>/dev/null
    else
        echo "N/A,N/A,N/A"
    fi
}

# Función para verificar errores recientes
check_errors() {
    local error_count=$(docker-compose logs --tail=10 api 2>/dev/null | grep -c -i "error\|exception\|failed" || echo "0")
    echo $error_count
}

# Función para verificar conexiones de base de datos
check_db_connections() {
    local connections=$(docker-compose exec -T postgres psql -U realstate -d realstate_db -t -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';" 2>/dev/null | tr -d ' ' || echo "N/A")
    echo $connections
}

# Función para alertas
send_alert() {
    local message="$1"
    log_message "ALERTA: $message"
    
    # Aquí puedes agregar notificaciones adicionales como:
    # - Enviar email
    # - Enviar notificación push
    # - Escribir a un archivo de alertas
    echo "🚨 ALERTA: $message" >> "alerts.log"
}

# Función principal de monitoreo
monitor() {
    local iteration=0
    
    echo "Iniciando monitoreo cada $INTERVAL segundos..."
    echo "Presiona Ctrl+C para detener"
    echo "Logs guardados en: $LOG_FILE"
    echo ""
    
    while true; do
        iteration=$((iteration + 1))
        echo "--- Iteración $iteration ---"
        
        # Verificar API
        if check_api; then
            show_status "OK" "API respondiendo"
        else
            show_status "ERROR" "API no responde"
            send_alert "API no responde en puerto $API_PORT"
        fi
        
        # Verificar health check
        if check_health; then
            show_status "OK" "Health check OK"
        else
            show_status "WARNING" "Health check no disponible"
        fi
        
        # Obtener estadísticas
        stats=$(get_stats)
        if [ "$stats" != "N/A,N/A,N/A" ]; then
            IFS=',' read -r cpu mem_usage mem_perc <<< "$stats"
            echo "📊 CPU: $cpu | Memoria: $mem_usage ($mem_perc)"
            
            # Verificar uso de memoria
            if [[ $mem_perc =~ ^[0-9]+$ ]] && [ $mem_perc -gt 80 ]; then
                show_status "WARNING" "Alto uso de memoria: $mem_perc%"
                send_alert "Alto uso de memoria: $mem_perc%"
            fi
        else
            show_status "ERROR" "No se pudieron obtener estadísticas del contenedor"
        fi
        
        # Verificar errores recientes
        error_count=$(check_errors)
        if [ "$error_count" -gt 5 ]; then
            show_status "WARNING" "Muchos errores recientes: $error_count"
            send_alert "Muchos errores recientes: $error_count"
        else
            show_status "OK" "Errores recientes: $error_count"
        fi
        
        # Verificar conexiones de base de datos
        db_connections=$(check_db_connections)
        if [ "$db_connections" != "N/A" ] && [ "$db_connections" -gt 50 ]; then
            show_status "WARNING" "Muchas conexiones de BD: $db_connections"
            send_alert "Muchas conexiones de base de datos: $db_connections"
        else
            show_status "OK" "Conexiones de BD: $db_connections"
        fi
        
        # Verificar espacio en disco
        disk_usage=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
        if [ "$disk_usage" -gt 80 ]; then
            show_status "WARNING" "Alto uso de disco: $disk_usage%"
            send_alert "Alto uso de disco: $disk_usage%"
        else
            show_status "OK" "Uso de disco: $disk_usage%"
        fi
        
        echo ""
        sleep $INTERVAL
    done
}

# Función para mostrar resumen
show_summary() {
    echo ""
    echo "📈 RESUMEN DE MONITOREO"
    echo "======================="
    
    if [ -f "$LOG_FILE" ]; then
        echo "Últimas 10 entradas del log:"
        tail -10 "$LOG_FILE"
        echo ""
    fi
    
    if [ -f "alerts.log" ]; then
        echo "Alertas recientes:"
        tail -5 "alerts.log"
        echo ""
    fi
    
    echo "Estado actual de la API:"
    if check_api; then
        show_status "OK" "API funcionando correctamente"
    else
        show_status "ERROR" "API no responde"
    fi
}

# Manejo de señales
trap 'echo ""; show_summary; echo "Monitoreo detenido."; exit 0' INT

# Verificar prerrequisitos
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado"
    exit 1
fi

if ! command -v curl &> /dev/null; then
    echo "❌ curl no está instalado"
    exit 1
fi

# Iniciar monitoreo
monitor
