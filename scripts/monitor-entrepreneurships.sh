#!/bin/bash

# Script de monitoreo específico para emprendimientos
# Detecta problemas en tiempo real con las consultas de emprendimientos

echo "🔍 Monitoreo de Emprendimientos - API RealState"
echo "=============================================="

API_URL="http://localhost:3002/api/v1/graphql"
HEALTH_URL="http://localhost:3002/health-check"

# Función para hacer una consulta de prueba
test_entrepreneurships_query() {
    echo "📊 Probando consulta de emprendimientos..."
    
    local response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d '{
            "query": "query { entrepreneurships { id name zone { id name } } }"
        }' \
        --max-time 10 \
        --connect-timeout 5)
    
    if [ $? -eq 0 ]; then
        local error_count=$(echo "$response" | jq '.errors | length' 2>/dev/null || echo "1")
        if [ "$error_count" = "0" ] || [ "$error_count" = "null" ]; then
            echo "✅ Consulta de emprendimientos exitosa"
            local result_count=$(echo "$response" | jq '.data.entrepreneurships | length' 2>/dev/null || echo "0")
            echo "📈 Emprendimientos encontrados: $result_count"
        else
            echo "❌ Error en consulta de emprendimientos:"
            echo "$response" | jq '.errors' 2>/dev/null || echo "$response"
        fi
    else
        echo "❌ Error de conexión al hacer consulta de emprendimientos"
    fi
}

# Función para probar consulta con filtro de zona
test_entrepreneurships_with_zone() {
    echo "📊 Probando consulta de emprendimientos con filtro de zona..."
    
    # Primero obtener una zona válida
    local zones_response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d '{
            "query": "query { zones { id name } }"
        }' \
        --max-time 10 \
        --connect-timeout 5)
    
    local zone_id=$(echo "$zones_response" | jq -r '.data.zones[0].id' 2>/dev/null)
    
    if [ "$zone_id" != "null" ] && [ -n "$zone_id" ]; then
        echo "🎯 Usando zona ID: $zone_id"
        
        local response=$(curl -s -X POST "$API_URL" \
            -H "Content-Type: application/json" \
            -d "{
                \"query\": \"query { entrepreneurships(associatedZone: \\\"$zone_id\\\") { id name zone { id name } } }\"
            }" \
            --max-time 10 \
            --connect-timeout 5)
        
        if [ $? -eq 0 ]; then
            local error_count=$(echo "$response" | jq '.errors | length' 2>/dev/null || echo "1")
            if [ "$error_count" = "0" ] || [ "$error_count" = "null" ]; then
                echo "✅ Consulta con filtro de zona exitosa"
                local result_count=$(echo "$response" | jq '.data.entrepreneurships | length' 2>/dev/null || echo "0")
                echo "📈 Emprendimientos en zona $zone_id: $result_count"
            else
                echo "❌ Error en consulta con filtro de zona:"
                echo "$response" | jq '.errors' 2>/dev/null || echo "$response"
            fi
        else
            echo "❌ Error de conexión en consulta con filtro de zona"
        fi
    else
        echo "⚠️ No se pudo obtener una zona válida para la prueba"
    fi
}

# Función para verificar salud de la API
check_api_health() {
    echo "🏥 Verificando salud de la API..."
    
    local health_response=$(curl -s "$HEALTH_URL" --max-time 5 --connect-timeout 3)
    
    if [ $? -eq 0 ]; then
        local status=$(echo "$health_response" | jq -r '.status' 2>/dev/null)
        local db_connected=$(echo "$health_response" | jq -r '.database.connected' 2>/dev/null)
        local memory_percent=$(echo "$health_response" | jq -r '.memory.percentage' 2>/dev/null)
        
        echo "📊 Estado de la API: $status"
        echo "🗄️ Base de datos conectada: $db_connected"
        echo "💾 Uso de memoria: $memory_percent%"
        
        if [ "$status" = "ok" ] && [ "$db_connected" = "true" ]; then
            echo "✅ API y base de datos funcionando correctamente"
        else
            echo "⚠️ Problemas detectados en la API o base de datos"
        fi
    else
        echo "❌ No se pudo conectar con la API"
    fi
}

# Función para verificar logs de errores
check_error_logs() {
    echo "📋 Verificando logs de errores recientes..."
    
    local error_logs=$(docker-compose logs --tail=50 api 2>/dev/null | grep -i "error\|exception\|failed" | tail -10)
    
    if [ -n "$error_logs" ]; then
        echo "🚨 Errores encontrados en los logs:"
        echo "$error_logs"
    else
        echo "✅ No se encontraron errores recientes en los logs"
    fi
}

# Función para verificar uso de recursos
check_resource_usage() {
    echo "📊 Verificando uso de recursos..."
    
    local stats=$(docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" realstate-api 2>/dev/null)
    
    if [ -n "$stats" ]; then
        echo "$stats"
    else
        echo "⚠️ No se pudo obtener estadísticas de recursos"
    fi
}

# Función para probar rate limiting
test_rate_limiting() {
    echo "🚦 Probando rate limiting..."
    
    local success_count=0
    local error_count=0
    
    for i in {1..10}; do
        local response=$(curl -s -X POST "$API_URL" \
            -H "Content-Type: application/json" \
            -d '{
                "query": "query { entrepreneurships { id name } }"
            }' \
            --max-time 5 \
            --connect-timeout 3)
        
        if [ $? -eq 0 ]; then
            local error_count_json=$(echo "$response" | jq '.errors | length' 2>/dev/null || echo "1")
            if [ "$error_count_json" = "0" ] || [ "$error_count_json" = "null" ]; then
                ((success_count++))
            else
                ((error_count++))
            fi
        else
            ((error_count++))
        fi
        
        sleep 0.1
    done
    
    echo "📈 Resultados del test de rate limiting:"
    echo "   ✅ Exitosas: $success_count"
    echo "   ❌ Fallidas: $error_count"
    
    if [ $error_count -gt 5 ]; then
        echo "⚠️ Posible problema de rate limiting o estabilidad"
    else
        echo "✅ Rate limiting funcionando correctamente"
    fi
}

# Función principal
main() {
    echo "🕐 Iniciando monitoreo: $(date)"
    echo ""
    
    check_api_health
    echo ""
    
    test_entrepreneurships_query
    echo ""
    
    test_entrepreneurships_with_zone
    echo ""
    
    test_rate_limiting
    echo ""
    
    check_resource_usage
    echo ""
    
    check_error_logs
    echo ""
    
    echo "🕐 Monitoreo completado: $(date)"
}

# Ejecutar monitoreo
main
