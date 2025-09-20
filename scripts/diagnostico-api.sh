#!/bin/bash

# Script de diagnóstico para problemas de desconexión de API
# Uso: ./scripts/diagnostico-api.sh

echo "🔍 DIAGNÓSTICO DE API REALSTATE"
echo "================================"
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

# 1. Verificar estado de Docker
echo "📦 VERIFICANDO DOCKER..."
echo "------------------------"
if command -v docker &> /dev/null; then
    show_status "OK" "Docker está instalado"
    
    if docker info &> /dev/null; then
        show_status "OK" "Docker está ejecutándose"
    else
        show_status "ERROR" "Docker no está ejecutándose"
        exit 1
    fi
else
    show_status "ERROR" "Docker no está instalado"
    exit 1
fi

if command -v docker-compose &> /dev/null; then
    show_status "OK" "Docker Compose está instalado"
else
    show_status "ERROR" "Docker Compose no está instalado"
    exit 1
fi
echo ""

# 2. Verificar estado de contenedores
echo "🐳 ESTADO DE CONTENEDORES..."
echo "----------------------------"
docker-compose ps
echo ""

# Verificar si los contenedores están ejecutándose
API_RUNNING=$(docker-compose ps -q api)
POSTGRES_RUNNING=$(docker-compose ps -q postgres)

if [ -n "$API_RUNNING" ]; then
    show_status "OK" "Contenedor de API está ejecutándose"
else
    show_status "ERROR" "Contenedor de API no está ejecutándose"
fi

if [ -n "$POSTGRES_RUNNING" ]; then
    show_status "OK" "Contenedor de PostgreSQL está ejecutándose"
else
    show_status "ERROR" "Contenedor de PostgreSQL no está ejecutándose"
fi
echo ""

# 3. Verificar puertos
echo "🌐 VERIFICANDO PUERTOS..."
echo "-------------------------"
API_PORT=$(grep "API_PORT=" .env 2>/dev/null | cut -d'=' -f2 || echo "3002")
DB_PORT=$(grep "DB_PORT=" .env 2>/dev/null | cut -d'=' -f2 || echo "5432")

echo "Puerto API configurado: $API_PORT"
echo "Puerto DB configurado: $DB_PORT"

# Verificar si los puertos están en uso
if lsof -Pi :$API_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    show_status "OK" "Puerto $API_PORT está en uso (API activa)"
else
    show_status "ERROR" "Puerto $API_PORT no está en uso"
fi

if lsof -Pi :$DB_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    show_status "OK" "Puerto $DB_PORT está en uso (PostgreSQL activo)"
else
    show_status "ERROR" "Puerto $DB_PORT no está en uso"
fi
echo ""

# 4. Verificar conectividad de la API
echo "🔌 VERIFICANDO CONECTIVIDAD..."
echo "------------------------------"
if curl -s http://localhost:$API_PORT/api/v1/graphql 2>/dev/null | grep -q "GET query missing\|GraphQL"; then
    show_status "OK" "API GraphQL responde en http://localhost:$API_PORT/api/v1/graphql"
else
    show_status "ERROR" "API no responde en http://localhost:$API_PORT/api/v1/graphql"
fi

# Verificar health check si existe
if curl -s -f http://localhost:$API_PORT/health-check >/dev/null 2>&1; then
    show_status "OK" "Health check responde correctamente"
else
    show_status "WARNING" "Health check no está implementado o no responde"
fi
echo ""

# 5. Verificar logs de errores
echo "📋 ANÁLISIS DE LOGS..."
echo "----------------------"
echo "Últimos 20 logs de la API:"
docker-compose logs --tail=20 api | grep -E "(error|Error|ERROR|warn|Warn|WARN)" || echo "No se encontraron errores recientes"
echo ""

# 6. Verificar uso de recursos
echo "💾 USO DE RECURSOS..."
echo "--------------------"
echo "Estado de contenedores:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" realstate-api realstate-postgres 2>/dev/null || echo "No se pudieron obtener estadísticas"
echo ""

# 7. Verificar conexiones de base de datos
echo "🗄️  VERIFICANDO BASE DE DATOS..."
echo "-------------------------------"
if docker-compose exec -T postgres pg_isready -U realstate -d realstate_db >/dev/null 2>&1; then
    show_status "OK" "PostgreSQL está respondiendo"
    
    # Verificar conexiones activas
    CONNECTIONS=$(docker-compose exec -T postgres psql -U realstate -d realstate_db -t -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';" 2>/dev/null | tr -d ' ')
    if [ -n "$CONNECTIONS" ] && [ "$CONNECTIONS" -gt 0 ]; then
        show_status "OK" "Conexiones activas a la base de datos: $CONNECTIONS"
    else
        show_status "WARNING" "No se pudieron verificar las conexiones de base de datos"
    fi
else
    show_status "ERROR" "PostgreSQL no está respondiendo"
fi
echo ""

# 8. Verificar configuración de red
echo "🌐 VERIFICANDO RED..."
echo "--------------------"
echo "Conexiones de red en puerto $API_PORT:"
netstat -an | grep ":$API_PORT" | head -5 || echo "No se encontraron conexiones"
echo ""

# 9. Verificar archivos de configuración
echo "⚙️  VERIFICANDO CONFIGURACIÓN..."
echo "-------------------------------"
if [ -f ".env" ]; then
    show_status "OK" "Archivo .env existe"
    
    # Verificar variables críticas
    if grep -q "DATABASE_URL=" .env; then
        show_status "OK" "DATABASE_URL configurado"
    else
        show_status "ERROR" "DATABASE_URL no configurado"
    fi
    
    if grep -q "JWT_SECRET=" .env; then
        show_status "OK" "JWT_SECRET configurado"
    else
        show_status "ERROR" "JWT_SECRET no configurado"
    fi
else
    show_status "ERROR" "Archivo .env no existe"
fi
echo ""

# 10. Recomendaciones
echo "💡 RECOMENDACIONES..."
echo "--------------------"
echo "1. Si la API no responde, ejecuta: docker-compose restart api"
echo "2. Si hay problemas de memoria, ejecuta: docker-compose down && docker-compose up -d"
echo "3. Para monitoreo continuo: docker-compose logs -f api"
echo "4. Para verificar health check: curl http://localhost:$API_PORT/health-check"
echo ""

# 11. Resumen final
echo "📊 RESUMEN FINAL"
echo "================"
API_STATUS="ERROR"
if curl -s http://localhost:$API_PORT/api/v1/graphql 2>/dev/null | grep -q "GET query missing\|GraphQL"; then
    API_STATUS="OK"
fi

if [ "$API_STATUS" = "OK" ]; then
    show_status "OK" "API está funcionando correctamente"
    echo ""
    echo "🌐 URLs disponibles:"
    echo "   - GraphQL: http://localhost:$API_PORT/api/v1/graphql"
    echo "   - Health Check: http://localhost:$API_PORT/health-check"
else
    show_status "ERROR" "API no está funcionando correctamente"
    echo ""
    echo "🔧 Acciones sugeridas:"
    echo "   1. docker-compose logs api"
    echo "   2. docker-compose restart api"
    echo "   3. docker-compose down && docker-compose up -d"
fi

echo ""
echo "✅ Diagnóstico completado"
