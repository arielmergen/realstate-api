#!/bin/bash

# Script de diagnóstico para identificar problemas de la API
# Ayuda a entender por qué la API puede estar fallando

echo "🔍 DIAGNÓSTICO DE PROBLEMAS DE LA API REALSTATE"
echo "================================================"
echo ""

# Verificar estado de contenedores
echo "📊 Estado de contenedores:"
docker-compose ps
echo ""

# Verificar uso de recursos
echo "💾 Uso de recursos:"
docker stats --no-stream
echo ""

# Verificar logs recientes
echo "📝 Logs recientes de la API:"
docker-compose logs api --tail=20
echo ""

# Verificar conectividad
echo "🌐 Pruebas de conectividad:"
echo -n "  - Health check: "
if curl -f -s http://localhost:3001/health-check > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FALLO"
fi

echo -n "  - Status endpoint: "
if curl -f -s http://localhost:3001/status > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FALLO"
fi

echo -n "  - GraphQL endpoint: "
if curl -f -s -X POST http://localhost:3002/api/v1/graphql -H "Content-Type: application/json" -d '{"query":"query { __schema { types { name } } }"}' > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FALLO"
fi

echo ""

# Verificar puertos
echo "🔌 Puertos en uso:"
netstat -tlnp | grep -E ":(3001|5433|5000)"
echo ""

# Verificar espacio en disco
echo "💽 Espacio en disco:"
df -h | grep -E "(Filesystem|/dev/)"
echo ""

# Verificar memoria del sistema
echo "🧠 Memoria del sistema:"
free -h
echo ""

# Verificar procesos de Node.js
echo "🟢 Procesos de Node.js:"
ps aux | grep node | grep -v grep
echo ""

# Verificar archivos de log
echo "📋 Archivos de log disponibles:"
if [ -d "/app/logs" ]; then
    ls -la /app/logs/
else
    echo "  No hay directorio de logs"
fi
echo ""

# Verificar configuración
echo "⚙️  Configuración actual:"
echo "  - NODE_OPTIONS: $(docker exec realstate-api env | grep NODE_OPTIONS || echo 'No definido')"
echo "  - PORT: $(docker exec realstate-api env | grep PORT || echo 'No definido')"
echo "  - NODE_ENV: $(docker exec realstate-api env | grep NODE_ENV || echo 'No definido')"
echo ""

echo "🏁 Diagnóstico completado"
echo "💡 Si encuentras problemas, revisa los logs y considera ajustar la configuración"
