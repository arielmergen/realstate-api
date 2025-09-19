# 🔧 Mejoras de Estabilidad - API RealState

## 📋 Problema Identificado

La API se desconecta periódicamente mostrando en Apollo:
```json
{
  "name": "NetworkError",
  "message": "Failed to fetch"
}
```

## 🛠️ Soluciones Implementadas

### 1. **Configuración de Apollo Server Mejorada**
- ✅ WebSocket keepAlive configurado (10 segundos)
- ✅ Manejo de errores mejorado con logging
- ✅ Límites de upload configurados (10MB, 10 archivos)
- ✅ Cache bounded habilitado
- ✅ Configuración de timeouts optimizada

### 2. **Configuración de Docker Optimizada**
- ✅ Límites de memoria: 512MB (API), 512MB (PostgreSQL)
- ✅ Límites de CPU: 0.5 cores por contenedor
- ✅ Health checks más frecuentes (15 segundos)
- ✅ Pool de conexiones de base de datos configurado
- ✅ Configuración de Node.js optimizada

### 3. **Configuración de PostgreSQL Mejorada**
- ✅ max_connections: 100
- ✅ shared_buffers: 256MB
- ✅ work_mem: 4MB
- ✅ Configuración de performance optimizada
- ✅ Checkpoint y WAL optimizados

### 4. **Endpoints de Monitoreo Agregados**
- ✅ `/health-check` - Estado de salud detallado
- ✅ `/metrics` - Métricas de sistema en tiempo real
- ✅ `/status` - Estado básico del servicio

### 5. **Scripts de Utilidad Creados**
- ✅ `diagnostico-api.sh` - Diagnóstico completo del sistema
- ✅ `reinicio-inteligente.sh` - Reinicio automático basado en estado
- ✅ `monitoreo-continuo.sh` - Monitoreo en tiempo real
- ✅ `aplicar-mejoras.sh` - Aplicación automática de todas las mejoras

## 🚀 Cómo Aplicar las Mejoras

### Opción 1: Aplicación Automática (Recomendada)
```bash
# Ejecutar script de mejoras
./scripts/aplicar-mejoras.sh
```

### Opción 2: Aplicación Manual
```bash
# 1. Detener servicios
docker-compose down

# 2. Reconstruir con mejoras
docker-compose build --no-cache

# 3. Iniciar servicios
docker-compose up -d

# 4. Verificar estado
./scripts/diagnostico-api.sh
```

## 📊 Monitoreo y Diagnóstico

### Verificación Rápida
```bash
# Estado general
./scripts/diagnostico-api.sh

# Monitoreo continuo (cada 30 segundos)
./scripts/monitoreo-continuo.sh

# Monitoreo continuo (cada 10 segundos)
./scripts/monitoreo-continuo.sh 10
```

### Endpoints de Monitoreo
```bash
# Health check detallado
curl http://localhost:3001/health-check

# Métricas del sistema
curl http://localhost:3001/metrics

# Estado básico
curl http://localhost:3001/status

# GraphQL (verificar que funciona)
curl http://localhost:3001/realstate
```

### Reinicio Inteligente
```bash
# Reinicio automático basado en estado
./scripts/reinicio-inteligente.sh
```

## 🔍 Diagnóstico de Problemas

### 1. **Verificar Estado de Contenedores**
```bash
docker-compose ps
docker stats --no-stream
```

### 2. **Verificar Logs**
```bash
# Logs de la API
docker-compose logs -f api

# Logs de PostgreSQL
docker-compose logs -f postgres

# Logs de errores recientes
docker-compose logs --tail=50 api | grep -i error
```

### 3. **Verificar Recursos**
```bash
# Uso de memoria y CPU
docker stats realstate-api realstate-postgres

# Espacio en disco
df -h

# Conexiones de red
netstat -an | grep :3001
```

### 4. **Verificar Base de Datos**
```bash
# Conexiones activas
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';"

# Estado de la base de datos
docker-compose exec postgres pg_isready -U realstate -d realstate_db
```

## ⚠️ Alertas y Umbrales

### Alertas Automáticas
- **Memoria > 80%**: Reinicio recomendado
- **CPU > 90% por 5 minutos**: Reinicio recomendado
- **Health check falla 3 veces**: Reinicio automático
- **Conexiones BD > 80%**: Alerta de sobrecarga

### Umbrales de Monitoreo
- **Memoria API**: 256MB reservado, 512MB límite
- **Memoria PostgreSQL**: 256MB reservado, 512MB límite
- **CPU**: 0.25 cores reservado, 0.5 cores límite
- **Conexiones BD**: Máximo 100, alerta en 80

## 🔧 Configuración Avanzada

### Variables de Entorno Adicionales
```env
# Configuración de Node.js
NODE_OPTIONS=--max-old-space-size=512

# Pool de conexiones de Prisma
DATABASE_URL="postgresql://realstate:realstate123@postgres:5432/realstate_db?connection_limit=10&pool_timeout=20"
```

### Configuración de Docker Compose
```yaml
# Límites de recursos
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'

# Health checks mejorados
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health-check"]
  interval: 15s
  timeout: 10s
  retries: 3
  start_period: 60s
```

## 📈 Métricas de Rendimiento

### Antes de las Mejoras
- ❌ Desconexiones frecuentes
- ❌ Sin monitoreo de recursos
- ❌ Health checks básicos
- ❌ Sin límites de recursos
- ❌ Configuración de BD por defecto

### Después de las Mejoras
- ✅ Conexiones estables
- ✅ Monitoreo en tiempo real
- ✅ Health checks detallados
- ✅ Límites de recursos configurados
- ✅ BD optimizada para performance

## 🚨 Solución de Problemas Comunes

### Problema: API no responde
```bash
# 1. Verificar estado
./scripts/diagnostico-api.sh

# 2. Reinicio inteligente
./scripts/reinicio-inteligente.sh

# 3. Si persiste, reinicio completo
docker-compose down && docker-compose up -d
```

### Problema: Alto uso de memoria
```bash
# 1. Verificar métricas
curl http://localhost:3001/metrics

# 2. Reinicio si es necesario
./scripts/reinicio-inteligente.sh
```

### Problema: Conexiones de BD agotadas
```bash
# 1. Verificar conexiones
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT count(*) FROM pg_stat_activity;"

# 2. Reiniciar API para liberar conexiones
docker-compose restart api
```

## 📞 Soporte

Si continúas experimentando problemas después de aplicar estas mejoras:

1. **Ejecuta el diagnóstico completo**:
   ```bash
   ./scripts/diagnostico-api.sh
   ```

2. **Revisa los logs de monitoreo**:
   ```bash
   cat monitoring.log
   cat alerts.log
   ```

3. **Verifica las métricas**:
   ```bash
   curl http://localhost:3001/metrics | jq
   ```

4. **Contacta al equipo de desarrollo** con:
   - Salida del diagnóstico
   - Logs de errores
   - Métricas del sistema
   - Descripción del problema

---

*Este documento debe ser actualizado regularmente según los hallazgos y mejoras adicionales implementadas.*
