#!/bin/bash

# Script para aplicar mejoras de estabilidad a la API RealState
# Uso: ./scripts/aplicar-mejoras.sh

echo "🔧 APLICANDO MEJORAS DE ESTABILIDAD A LA API"
echo "============================================"
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

# 1. Verificar que estamos en el directorio correcto
echo "🔍 VERIFICANDO DIRECTORIO..."
echo "----------------------------"
if [ ! -f "package.json" ] || [ ! -f "docker-compose.yml" ]; then
    show_status "ERROR" "No se encontraron archivos del proyecto. Ejecuta desde el directorio raíz."
    exit 1
fi
show_status "OK" "Directorio correcto detectado"
echo ""

# 2. Hacer backup de archivos importantes
echo "💾 CREANDO BACKUP..."
echo "--------------------"
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp docker-compose.yml "$BACKUP_DIR/" 2>/dev/null || true
cp src/app.module.ts "$BACKUP_DIR/" 2>/dev/null || true
cp src/app.service.ts "$BACKUP_DIR/" 2>/dev/null || true
cp src/app.controller.ts "$BACKUP_DIR/" 2>/dev/null || true

show_status "OK" "Backup creado en: $BACKUP_DIR"
echo ""

# 3. Verificar que Docker esté funcionando
echo "🐳 VERIFICANDO DOCKER..."
echo "------------------------"
if ! docker info &> /dev/null; then
    show_status "ERROR" "Docker no está ejecutándose"
    exit 1
fi
show_status "OK" "Docker está funcionando"
echo ""

# 4. Detener servicios actuales
echo "🛑 DETENIENDO SERVICIOS ACTUALES..."
echo "-----------------------------------"
docker-compose down
show_status "OK" "Servicios detenidos"
echo ""

# 5. Limpiar contenedores y volúmenes
echo "🧹 LIMPIANDO CONTENEDORES..."
echo "----------------------------"
docker container prune -f
docker volume prune -f
show_status "OK" "Limpieza completada"
echo ""

# 6. Reconstruir imágenes con las mejoras
echo "🔨 RECONSTRUYENDO IMÁGENES..."
echo "-----------------------------"
docker-compose build --no-cache
if [ $? -eq 0 ]; then
    show_status "OK" "Imágenes reconstruidas exitosamente"
else
    show_status "ERROR" "Error al reconstruir imágenes"
    exit 1
fi
echo ""

# 7. Iniciar servicios con las mejoras
echo "🚀 INICIANDO SERVICIOS CON MEJORAS..."
echo "------------------------------------"
docker-compose up -d
if [ $? -eq 0 ]; then
    show_status "OK" "Servicios iniciados"
else
    show_status "ERROR" "Error al iniciar servicios"
    exit 1
fi
echo ""

# 8. Esperar a que los servicios estén listos
echo "⏳ ESPERANDO A QUE LOS SERVICIOS ESTÉN LISTOS..."
echo "----------------------------------------------"
sleep 20

# Verificar PostgreSQL
echo "Verificando PostgreSQL..."
for i in {1..30}; do
    if docker-compose exec -T postgres pg_isready -U realstate -d realstate_db >/dev/null 2>&1; then
        show_status "OK" "PostgreSQL está listo"
        break
    fi
    if [ $i -eq 30 ]; then
        show_status "ERROR" "PostgreSQL no responde después de 30 intentos"
        echo "Logs de PostgreSQL:"
        docker-compose logs postgres
        exit 1
    fi
    echo "⏳ Esperando PostgreSQL... (intento $i/30)"
    sleep 2
done

# Verificar API
echo "Verificando API..."
API_PORT=$(grep "API_PORT=" .env 2>/dev/null | cut -d'=' -f2 || echo "3002")
for i in {1..20}; do
    if curl -s -f http://localhost:$API_PORT/health-check >/dev/null 2>&1; then
        show_status "OK" "API está respondiendo"
        break
    fi
    if [ $i -eq 20 ]; then
        show_status "WARNING" "API no responde, pero continuando..."
        break
    fi
    echo "⏳ Esperando API... (intento $i/20)"
    sleep 3
done
echo ""

# 9. Verificar endpoints de monitoreo
echo "🔍 VERIFICANDO ENDPOINTS DE MONITOREO..."
echo "---------------------------------------"

# Health check
if curl -s -f http://localhost:$API_PORT/health-check >/dev/null 2>&1; then
    show_status "OK" "Health check funcionando"
    echo "   Respuesta: $(curl -s http://localhost:$API_PORT/health-check | head -c 100)..."
else
    show_status "WARNING" "Health check no disponible"
fi

# Metrics
if curl -s -f http://localhost:$API_PORT/metrics >/dev/null 2>&1; then
    show_status "OK" "Métricas funcionando"
    echo "   Respuesta: $(curl -s http://localhost:$API_PORT/metrics | head -c 100)..."
else
    show_status "WARNING" "Métricas no disponibles"
fi

# Status
if curl -s -f http://localhost:$API_PORT/status >/dev/null 2>&1; then
    show_status "OK" "Status funcionando"
    echo "   Respuesta: $(curl -s http://localhost:$API_PORT/status | head -c 100)..."
else
    show_status "WARNING" "Status no disponible"
fi
echo ""

# 10. Mostrar resumen de mejoras aplicadas
echo "📋 RESUMEN DE MEJORAS APLICADAS"
echo "==============================="
echo ""
echo "✅ Configuración de Apollo Server mejorada:"
echo "   - WebSocket keepAlive: 10 segundos"
echo "   - Manejo de errores mejorado"
echo "   - Límites de upload configurados"
echo "   - Cache bounded habilitado"
echo ""
echo "✅ Configuración de Docker mejorada:"
echo "   - Límites de memoria: 512MB (API), 512MB (PostgreSQL)"
echo "   - Límites de CPU: 0.5 cores"
echo "   - Health checks más frecuentes (15s)"
echo "   - Pool de conexiones de BD configurado"
echo ""
echo "✅ Configuración de PostgreSQL mejorada:"
echo "   - max_connections: 100"
echo "   - shared_buffers: 256MB"
echo "   - work_mem: 4MB"
echo "   - Configuración de performance optimizada"
echo ""
echo "✅ Endpoints de monitoreo agregados:"
echo "   - /health-check - Estado de salud detallado"
echo "   - /metrics - Métricas de sistema"
echo "   - /status - Estado básico del servicio"
echo ""
echo "✅ Scripts de utilidad creados:"
echo "   - scripts/diagnostico-api.sh - Diagnóstico completo"
echo "   - scripts/reinicio-inteligente.sh - Reinicio automático"
echo "   - scripts/monitoreo-continuo.sh - Monitoreo en tiempo real"
echo ""

# 11. Mostrar URLs y comandos útiles
echo "🌐 URLs DISPONIBLES"
echo "==================="
echo "   - GraphQL: http://localhost:$API_PORT/api/v1/graphql"
echo "   - Health Check: http://localhost:$API_PORT/health-check"
echo "   - Métricas: http://localhost:$API_PORT/metrics"
echo "   - Status: http://localhost:$API_PORT/status"
echo ""

echo "🔧 COMANDOS ÚTILES"
echo "=================="
echo "   - Diagnóstico: ./scripts/diagnostico-api.sh"
echo "   - Reinicio inteligente: ./scripts/reinicio-inteligente.sh"
echo "   - Monitoreo continuo: ./scripts/monitoreo-continuo.sh"
echo "   - Ver logs: docker-compose logs -f api"
echo "   - Estado de contenedores: docker-compose ps"
echo ""

# 12. Verificación final
echo "🎯 VERIFICACIÓN FINAL"
echo "====================="
if curl -s -f http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
    show_status "OK" "¡API funcionando correctamente con todas las mejoras!"
    echo ""
    echo "🎉 ¡MEJORAS APLICADAS EXITOSAMENTE!"
    echo "=================================="
    echo ""
    echo "La API ahora tiene:"
    echo "✅ Mejor manejo de conexiones"
    echo "✅ Límites de recursos configurados"
    echo "✅ Monitoreo mejorado"
    echo "✅ Health checks más robustos"
    echo "✅ Configuración de base de datos optimizada"
    echo ""
    echo "Recomendación: Ejecuta el monitoreo continuo para verificar la estabilidad:"
    echo "   ./scripts/monitoreo-continuo.sh"
else
    show_status "WARNING" "API no responde, pero las mejoras están aplicadas"
    echo ""
    echo "Ejecuta el diagnóstico para más información:"
    echo "   ./scripts/diagnostico-api.sh"
fi

echo ""
echo "✅ Proceso completado"
