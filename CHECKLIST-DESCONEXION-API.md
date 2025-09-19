# 🔍 Listado de Chequeo - Problema de Desconexión de API

## 📋 Descripción del Problema
La API se desconecta periódicamente mostrando en Apollo:
```json
{
  "name": "NetworkError",
  "message": "Failed to fetch"
}
```

El problema se resuelve temporalmente haciendo `docker-compose down` y `docker-compose up` nuevamente.

---

## 🔧 Chequeo de Configuración del Servidor

### 1. **Timeouts del Servidor HTTP** ✅
**Ubicación:** `src/main.ts` líneas 15-17
```typescript
server.keepAliveTimeout = 65000;    // 65 segundos
server.headersTimeout = 66000;      // 66 segundos
```
**Estado:** ✅ Configurado correctamente
**Recomendación:** Los timeouts están bien configurados, pero podrían ser más largos para conexiones de larga duración.

### 2. **Configuración de Apollo Server** ⚠️
**Ubicación:** `src/app.module.ts` líneas 34-65
```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  path: '/realstate',
  bodyParserConfig: false,
  typePaths: ['./**/*.graphql'],
  introspection: true,
  subscriptions: {
    'graphql-ws': {
      onConnect: (context) => {
        console.log('🔌 WebSocket GraphQL conectado');
        return true;
      },
      onDisconnect: (context, code, reason) => {
        console.log('🔌 WebSocket GraphQL desconectado');
      },
    },
  },
  cors: {
    origin: true,
    credentials: true,
  },
})
```
**Problemas identificados:**
- ❌ No hay configuración de timeouts específicos para Apollo
- ❌ No hay configuración de `keepAlive` para WebSockets
- ❌ No hay configuración de `maxFileSize` o `maxFiles`

### 3. **Health Checks de Docker** ⚠️
**Ubicación:** `docker-compose.yml` líneas 50-55
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health-check"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 60s
```
**Problemas identificados:**
- ❌ No hay endpoint `/health-check` implementado
- ⚠️ Intervalo de 30s puede ser muy largo para detectar problemas rápidamente

---

## 🐳 Chequeo de Configuración de Docker

### 4. **Configuración de Red** ✅
**Ubicación:** `docker-compose.yml` líneas 60-61
```yaml
networks:
  realstate-network:
    driver: bridge
```
**Estado:** ✅ Configurado correctamente

### 5. **Política de Reinicio** ⚠️
**Ubicación:** `docker-compose.yml` línea 49
```yaml
restart: unless-stopped
```
**Estado:** ⚠️ Configurado, pero puede no ser suficiente para problemas de memoria

### 6. **Límites de Recursos** ❌
**Problema:** No hay límites de memoria o CPU configurados
**Recomendación:** Agregar límites para evitar que el contenedor consuma toda la memoria del sistema

---

## 🗄️ Chequeo de Base de Datos

### 7. **Configuración de PostgreSQL** ⚠️
**Ubicación:** `docker-compose.yml` líneas 4-22
```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: realstate_db
    POSTGRES_USER: realstate
    POSTGRES_PASSWORD: realstate123
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U realstate -d realstate_db"]
    interval: 10s
    timeout: 5s
    retries: 5
```
**Problemas identificados:**
- ❌ No hay configuración de `max_connections`
- ❌ No hay configuración de `shared_buffers`
- ❌ No hay configuración de `work_mem`

### 8. **Pool de Conexiones de Prisma** ❌
**Problema:** No hay configuración visible del pool de conexiones de Prisma
**Recomendación:** Configurar `connection_limit` y `pool_timeout`

---

## 📊 Chequeo de Monitoreo y Logs

### 9. **Logs de Aplicación** ⚠️
**Ubicación:** `src/main.ts` línea 9
```typescript
logger: ['error', 'warn', 'log', 'debug', 'verbose']
```
**Estado:** ✅ Configurado, pero puede generar muchos logs

### 10. **Monitoreo de Recursos** ❌
**Problema:** No hay monitoreo de memoria, CPU o conexiones de base de datos
**Recomendación:** Implementar métricas de monitoreo

---

## 🔍 Chequeo de Red y Conectividad

### 11. **Configuración de CORS** ✅
**Ubicación:** `src/app.module.ts` líneas 61-64
```typescript
cors: {
  origin: true,
  credentials: true,
}
```
**Estado:** ✅ Configurado correctamente

### 12. **Configuración de Puerto** ✅
**Ubicación:** `docker-compose.yml` línea 27
```yaml
ports:
  - "${API_PORT:-3002}:5000"
```
**Estado:** ✅ Configurado correctamente

---

## 🚨 Acciones Inmediatas Recomendadas

### **Prioridad Alta** 🔴

1. **Implementar endpoint de health check**
   ```typescript
   // En app.controller.ts
   @Get('health-check')
   healthCheck() {
     return { status: 'ok', timestamp: new Date().toISOString() };
   }
   ```

2. **Configurar timeouts de Apollo Server**
   ```typescript
   GraphQLModule.forRoot<ApolloDriverConfig>({
     // ... configuración existente
     subscriptions: {
       'graphql-ws': {
         onConnect: (context) => {
           console.log('🔌 WebSocket GraphQL conectado');
           return true;
         },
         onDisconnect: (context, code, reason) => {
           console.log('🔌 WebSocket GraphQL desconectado');
         },
         keepAlive: 10000, // 10 segundos
       },
     },
     // Agregar configuración de timeouts
     context: ({ req }) => ({ req }),
     formatError: (error) => {
       console.error('GraphQL Error:', error);
       return error;
     },
   })
   ```

3. **Agregar límites de recursos en Docker**
   ```yaml
   api:
     # ... configuración existente
     deploy:
       resources:
         limits:
           memory: 512M
           cpus: '0.5'
         reservations:
           memory: 256M
           cpus: '0.25'
   ```

### **Prioridad Media** 🟡

4. **Configurar pool de conexiones de Prisma**
   ```typescript
   // En prisma.service.ts
   constructor() {
     super({
       datasources: {
         db: {
           url: process.env.DATABASE_URL + '?connection_limit=5&pool_timeout=20',
         },
       },
     });
   }
   ```

5. **Mejorar configuración de PostgreSQL**
   ```yaml
   postgres:
     # ... configuración existente
     environment:
       POSTGRES_DB: realstate_db
       POSTGRES_USER: realstate
       POSTGRES_PASSWORD: realstate123
       # Agregar configuración de performance
       POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
     command: >
       postgres
       -c max_connections=100
       -c shared_buffers=256MB
       -c work_mem=4MB
       -c maintenance_work_mem=64MB
   ```

6. **Implementar monitoreo básico**
   ```typescript
   // En app.service.ts
   @Get('metrics')
   getMetrics() {
     return {
       uptime: process.uptime(),
       memory: process.memoryUsage(),
       timestamp: new Date().toISOString(),
     };
   }
   ```

### **Prioridad Baja** 🟢

7. **Configurar logs rotativos**
8. **Implementar alertas automáticas**
9. **Configurar backup automático de base de datos**

---

## 🔧 Scripts de Diagnóstico

### **Script de Verificación Rápida**
```bash
#!/bin/bash
echo "🔍 Verificando estado de la API..."

# Verificar contenedores
echo "📦 Estado de contenedores:"
docker-compose ps

# Verificar logs de errores
echo "📋 Últimos errores de la API:"
docker-compose logs --tail=50 api | grep -i error

# Verificar uso de memoria
echo "💾 Uso de memoria:"
docker stats --no-stream realstate-api

# Verificar conexiones de red
echo "🌐 Conexiones de red:"
netstat -an | grep :3001

# Verificar health check
echo "🏥 Health check:"
curl -f http://localhost:3001/health-check || echo "❌ Health check falló"
```

### **Script de Reinicio Inteligente**
```bash
#!/bin/bash
echo "🔄 Reiniciando API de forma inteligente..."

# Verificar si hay problemas de memoria
MEMORY_USAGE=$(docker stats --no-stream --format "{{.MemUsage}}" realstate-api | cut -d'/' -f1 | tr -d ' ')
if [[ $MEMORY_USAGE > "500M" ]]; then
    echo "⚠️  Alto uso de memoria detectado: $MEMORY_USAGE"
    echo "🧹 Limpiando contenedores..."
    docker-compose down -v
    sleep 5
    echo "🚀 Reiniciando servicios..."
    docker-compose up -d
else
    echo "✅ Uso de memoria normal: $MEMORY_USAGE"
    echo "🔄 Reiniciando solo la API..."
    docker-compose restart api
fi
```

---

## 📈 Monitoreo Continuo

### **Comandos de Monitoreo**
```bash
# Monitoreo en tiempo real
docker-compose logs -f api

# Verificar estado cada 30 segundos
watch -n 30 'docker-compose ps && curl -s http://localhost:3001/health-check'

# Verificar uso de recursos
watch -n 10 'docker stats --no-stream realstate-api realstate-postgres'
```

### **Alertas Recomendadas**
- Memoria > 80% del límite
- CPU > 90% por más de 5 minutos
- Health check falla 3 veces consecutivas
- Conexiones de base de datos > 80% del límite

---

## 🎯 Próximos Pasos

1. **Implementar las correcciones de prioridad alta**
2. **Ejecutar el script de verificación rápida**
3. **Monitorear la API por 24-48 horas**
4. **Ajustar configuraciones según los resultados**
5. **Documentar cualquier nuevo problema encontrado**

---

*Este listado de chequeo debe ser actualizado regularmente según los hallazgos y mejoras implementadas.*
