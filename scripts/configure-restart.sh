#!/bin/bash

# Script de configuración para el sistema de reinicio inteligente
# Permite ajustar parámetros sin modificar el código

CONFIG_FILE="/app/config/restart-config.env"

# Crear directorio de configuración
mkdir -p /app/config

# Valores por defecto
cat > "$CONFIG_FILE" << EOF
# Configuración del sistema de reinicio inteligente
MAX_RESTARTS=10
BASE_DELAY=5
MAX_DELAY=300
HEALTH_CHECK_TIMEOUT=10
MEMORY_THRESHOLD=80
RESPONSE_TIME_THRESHOLD=5
LOG_LEVEL=INFO
EOF

echo "✅ Configuración creada en $CONFIG_FILE"
echo "📝 Parámetros configurables:"
echo "   - MAX_RESTARTS: Máximo número de reinicios (default: 10)"
echo "   - BASE_DELAY: Delay inicial entre reinicios en segundos (default: 5)"
echo "   - MAX_DELAY: Delay máximo entre reinicios en segundos (default: 300)"
echo "   - HEALTH_CHECK_TIMEOUT: Timeout para health checks en segundos (default: 10)"
echo "   - MEMORY_THRESHOLD: Umbral de memoria en porcentaje (default: 80)"
echo "   - RESPONSE_TIME_THRESHOLD: Umbral de tiempo de respuesta en segundos (default: 5)"
echo ""
echo "💡 Para modificar: edita $CONFIG_FILE y reinicia el contenedor"
