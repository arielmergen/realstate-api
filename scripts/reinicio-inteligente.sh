#!/bin/bash

# Script de reinicio inteligente para API RealState
# Uso: ./scripts/reinicio-inteligente.sh

echo "🔄 REINICIO INTELIGENTE DE API REALSTATE"
echo "========================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar estado
show_status() {
    local status=$1
    local message=$2
    if [ "$status" = "OK" ]; then
        echo -e "${GREEN}✅ $message${NC}"
    elif [ "$status" = "WARNING" ]; then
        echo -e "${YELLOW}⚠️  $message${NC}"
    else
        echo -e "${RED}❌ $message${NC}"
    fi
}

# Obtener puerto de la API
API_PORT=$(grep "API_PORT=" .env 2>/dev/null | cut -d'=' -f2 || echo "3002")

# 1. Verificar estado actual de la API
echo "🔍 VERIFICANDO ESTADO ACTUAL..."
echo "-------------------------------"

API_RESPONDING=false
if curl -s -f http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
    show_status "OK" "API está respondiendo correctamente"
    API_RESPONDING=true
else
    show_status "ERROR" "API no está respondiendo"
fi

# 2. Verificar uso de memoria
echo ""
echo "💾 VERIFICANDO USO DE MEMORIA..."
echo "-------------------------------"

MEMORY_USAGE=""
if docker ps --format "table {{.Names}}" | grep -q "realstate-api"; then
    MEMORY_USAGE=$(docker stats --no-stream --format "{{.MemUsage}}" realstate-api | cut -d'/' -f1 | tr -d ' ' | sed 's/MiB//')
    echo "Uso actual de memoria: ${MEMORY_USAGE}MB"
    
    if [ -n "$MEMORY_USAGE" ] && [ "$MEMORY_USAGE" -gt 400 ]; then
        show_status "WARNING" "Alto uso de memoria detectado: ${MEMORY_USAGE}MB"
        echo "   Se recomienda reinicio completo para liberar memoria"
    else
        show_status "OK" "Uso de memoria normal: ${MEMORY_USAGE}MB"
    fi
else
    show_status "ERROR" "Contenedor de API no encontrado"
fi

# 3. Verificar logs de errores recientes
echo ""
echo "📋 VERIFICANDO LOGS DE ERRORES..."
echo "--------------------------------"
ERROR_COUNT=$(docker-compose logs --tail=50 api 2>/dev/null | grep -c -i "error\|exception\|failed" || echo "0")
echo "Errores recientes encontrados: $ERROR_COUNT"

if [ "$ERROR_COUNT" -gt 5 ]; then
    show_status "WARNING" "Muchos errores recientes detectados"
    echo "   Últimos errores:"
    docker-compose logs --tail=10 api | grep -i "error\|exception\|failed" | tail -3
else
    show_status "OK" "Pocos errores recientes"
fi

# 4. Decidir tipo de reinicio
echo ""
echo "🤔 DECIDIENDO TIPO DE REINICIO..."
echo "--------------------------------"

RESTART_TYPE="soft"

if [ "$API_RESPONDING" = false ]; then
    RESTART_TYPE="hard"
    echo "API no responde → Reinicio completo necesario"
elif [ -n "$MEMORY_USAGE" ] && [ "$MEMORY_USAGE" -gt 400 ]; then
    RESTART_TYPE="hard"
    echo "Alto uso de memoria → Reinicio completo necesario"
elif [ "$ERROR_COUNT" -gt 10 ]; then
    RESTART_TYPE="hard"
    echo "Muchos errores → Reinicio completo necesario"
else
    RESTART_TYPE="soft"
    echo "Problemas menores → Reinicio suave suficiente"
fi

# 5. Ejecutar reinicio
echo ""
echo "🚀 EJECUTANDO REINICIO $RESTART_TYPE..."
echo "======================================"

if [ "$RESTART_TYPE" = "hard" ]; then
    show_status "WARNING" "Ejecutando reinicio completo..."
    
    echo "🛑 Deteniendo servicios..."
    docker-compose down -v
    sleep 5
    
    echo "🧹 Limpiando contenedores huérfanos..."
    docker container prune -f >/dev/null 2>&1
    
    echo "🚀 Iniciando servicios..."
    docker-compose up -d
    
    echo "⏳ Esperando a que los servicios estén listos..."
    sleep 15
    
else
    show_status "OK" "Ejecutando reinicio suave..."
    
    echo "🔄 Reiniciando solo la API..."
    docker-compose restart api
    
    echo "⏳ Esperando a que la API esté lista..."
    sleep 10
fi

# 6. Verificar que el reinicio fue exitoso
echo ""
echo "✅ VERIFICANDO REINICIO..."
echo "-------------------------"

# Esperar un poco más para que la API esté completamente lista
sleep 5

SUCCESS_COUNT=0
MAX_ATTEMPTS=10

for i in $(seq 1 $MAX_ATTEMPTS); do
    if curl -s -f http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        if [ $SUCCESS_COUNT -ge 3 ]; then
            show_status "OK" "API está respondiendo correctamente después del reinicio"
            break
        fi
    else
        SUCCESS_COUNT=0
        echo "⏳ Intento $i/$MAX_ATTEMPTS - Esperando respuesta de la API..."
    fi
    sleep 3
done

if [ $SUCCESS_COUNT -lt 3 ]; then
    show_status "ERROR" "API no responde después del reinicio"
    echo ""
    echo "🔍 Diagnóstico adicional:"
    echo "   - Verificar logs: docker-compose logs api"
    echo "   - Verificar estado: docker-compose ps"
    echo "   - Verificar puertos: lsof -i :$API_PORT"
    echo ""
    echo "🔄 Intentar reinicio manual:"
    echo "   docker-compose down && docker-compose up -d"
else
    echo ""
    echo "🎉 ¡REINICIO EXITOSO!"
    echo "===================="
    echo ""
    echo "🌐 URLs disponibles:"
    echo "   - GraphQL: http://localhost:$API_PORT/api/v1/graphql"
    echo "   - Health Check: http://localhost:$API_PORT/health-check"
    echo ""
    echo "📊 Estado actual:"
    echo "   - Memoria: $(docker stats --no-stream --format "{{.MemUsage}}" realstate-api 2>/dev/null || echo "N/A")"
    echo "   - Estado: $(docker-compose ps --services --filter "status=running" | grep api && echo "Ejecutándose" || echo "Detenido")"
fi

echo ""
echo "✅ Proceso de reinicio completado"
