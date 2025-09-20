#!/bin/bash

# Script de configuración local para API RealState
echo "🚀 Configurando API RealState para desarrollo local..."

# Detectar sistema operativo
detect_os() {
    case "$(uname -s)" in
        Darwin*)    OS="macos" ;;
        Linux*)     OS="linux" ;;
        CYGWIN*)    OS="windows" ;;
        MINGW*)     OS="windows" ;;
        MSYS*)      OS="windows" ;;
        *)          OS="unknown" ;;
    esac
    echo "🔍 Sistema operativo detectado: $OS"
}

# Detectar sistema operativo al inicio
detect_os

# Función para limpiar solo contenedores específicos de RealState
clean_realstate_containers() {
    echo "🧹 Verificando contenedores anteriores de RealState..."
    
    # Verificar y eliminar contenedor de PostgreSQL si existe
    if docker ps -a --format "table {{.Names}}" | grep -q "realstate-postgres"; then
        echo "   - Eliminando contenedor realstate-postgres existente..."
        docker container rm -f realstate-postgres 2>/dev/null || true
    else
        echo "   - No hay contenedor realstate-postgres existente"
    fi
    
    # Verificar y eliminar contenedor de API si existe
    if docker ps -a --format "table {{.Names}}" | grep -q "realstate-api"; then
        echo "   - Eliminando contenedor realstate-api existente..."
        docker container rm -f realstate-api 2>/dev/null || true
    else
        echo "   - No hay contenedor realstate-api existente"
    fi
    
    # Detener servicios de docker-compose si están ejecutándose
    echo "   - Deteniendo servicios de docker-compose..."
    docker-compose down -v 2>/dev/null || true
    
    echo "✅ Verificación y limpieza completada"
}

# Función para liberar puertos ocupados (multiplataforma)
free_occupied_ports() {
    echo "🔓 Liberando puertos ocupados por instalaciones anteriores..."
    
    # Función para liberar un puerto específico
    free_port() {
        local port=$1
        local port_name=$2
        
        case "$OS" in
            "macos"|"linux")
                if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
                    echo "   - Puerto $port ($port_name) está ocupado, liberando..."
                    
                    # Mostrar qué proceso está usando el puerto
                    local pid=$(lsof -Pi :$port -sTCP:LISTEN -t 2>/dev/null | head -1)
                    if [ ! -z "$pid" ]; then
                        local process_name=$(ps -p $pid -o comm= 2>/dev/null || echo "desconocido")
                        echo "     Proceso: $process_name (PID: $pid)"
                    fi
                    
                    # Intentar matar el proceso
                    lsof -Pi :$port -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
                    sleep 3
                    
                    # Verificar si se liberó
                    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
                        echo "     ⚠️  Puerto $port aún ocupado, intentando con sudo..."
                        sudo lsof -Pi :$port -sTCP:LISTEN -t | xargs sudo kill -9 2>/dev/null || true
                        sleep 2
                    fi
                    
                    # Verificación final
                    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
                        echo "     ❌ No se pudo liberar el puerto $port"
                        return 1
                    else
                        echo "     ✅ Puerto $port liberado"
                        return 0
                    fi
                else
                    echo "   - Puerto $port ($port_name) está libre"
                    return 0
                fi
                ;;
            "windows")
                echo "   - En Windows, la liberación de puertos se maneja automáticamente"
                echo "   - Si hay conflictos, reinicia Docker Desktop"
                return 0
                ;;
            *)
                echo "   - Sistema operativo no soportado para liberación de puertos"
                return 1
                ;;
        esac
    }
    
    # Liberar puertos
    free_port 3002 "API"
    free_port 5432 "PostgreSQL"
    free_port 3002 "API alternativa"
    
    echo "✅ Proceso de liberación de puertos completado"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Función para verificar si un puerto está disponible (multiplataforma)
check_port() {
    local port=$1
    
    case "$OS" in
        "macos"|"linux")
            # Método 1: lsof (macOS/Linux)
            if command -v lsof >/dev/null 2>&1; then
                if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
                    return 1  # Puerto ocupado
                fi
            fi
            
            # Método 2: netstat (alternativo)
            if command -v netstat >/dev/null 2>&1; then
                if netstat -an 2>/dev/null | grep -q ":$port.*LISTEN"; then
                    return 1  # Puerto ocupado
                fi
            fi
            
            # Método 3: nc (netcat) - intentar conectar
            if command -v nc >/dev/null 2>&1; then
                if nc -z localhost $port 2>/dev/null; then
                    return 1  # Puerto ocupado
                fi
            fi
            ;;
        "windows")
            # Para Windows (WSL/Git Bash)
            if command -v netstat >/dev/null 2>&1; then
                if netstat -an 2>/dev/null | grep -q ":$port.*LISTEN"; then
                    return 1  # Puerto ocupado
                fi
            fi
            
            # Usar PowerShell si está disponible
            if command -v powershell >/dev/null 2>&1; then
                if powershell -Command "Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet" 2>/dev/null | grep -q "True"; then
                    return 1  # Puerto ocupado
                fi
            fi
            ;;
        *)
            echo "⚠️  Sistema operativo no soportado: $OS"
            return 1
            ;;
    esac
    
    return 0  # Puerto disponible
}

# Función para encontrar un puerto disponible
find_available_port() {
    local start_port=$1
    local port=$start_port
    
    while ! check_port $port; do
        port=$((port + 1))
        if [ $port -gt $((start_port + 100)) ]; then
            echo "❌ No se encontró un puerto disponible en el rango $start_port-$((start_port + 100))"
            exit 1
        fi
    done
    echo $port
}

# Liberar puertos ocupados por instalaciones anteriores
free_occupied_ports

# Verificar puertos necesarios
echo "🔍 Verificando disponibilidad de puertos..."

# Verificar puerto 3002 (API)
echo "🔍 Verificando puerto 3002 (API)..."
if nc -z localhost 3002 2>/dev/null; then
    echo "⚠️  Puerto 3002 está ocupado, buscando alternativa..."
    API_PORT=$(find_available_port 3002)
    echo "✅ Puerto $API_PORT disponible para la API"
else
    API_PORT=3002
    echo "✅ Puerto 3002 disponible para la API"
fi

# Verificar puerto 5432 (PostgreSQL)
echo "🔍 Verificando puerto 5432 (PostgreSQL)..."
if nc -z localhost 5432 2>/dev/null; then
    echo "⚠️  Puerto 5432 está ocupado por un proceso del sistema"
    echo "   - Usando puerto alternativo para PostgreSQL..."
    DB_PORT=$(find_available_port 5433)
    echo "✅ Puerto $DB_PORT disponible para PostgreSQL"
    echo "   - PostgreSQL se ejecutará en puerto $DB_PORT (mapeado desde 5432 interno)"
else
    DB_PORT=5432
    echo "✅ Puerto 5432 disponible para PostgreSQL"
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cp env.example .env
    echo "✅ Archivo .env creado"
else
    echo "✅ Archivo .env ya existe"
fi

# Configurar puertos en .env
echo "🔧 Configurando puertos en .env..."
if grep -q "API_PORT=" .env; then
    # Actualizar puerto existente
    sed -i.bak "s/API_PORT=.*/API_PORT=$API_PORT/" .env
else
    # Agregar puerto si no existe
    echo "API_PORT=$API_PORT" >> .env
fi

# Configurar puerto de PostgreSQL si es diferente a 5432
if [ "$DB_PORT" != "5432" ]; then
    if grep -q "DB_PORT=" .env; then
        # Actualizar puerto existente
        sed -i.bak "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env
    else
        # Agregar puerto si no existe
        echo "DB_PORT=$DB_PORT" >> .env
    fi
    echo "   - PostgreSQL configurado en puerto $DB_PORT"
fi

echo "   - API se ejecutará en puerto $API_PORT (mapeado desde 5000 interno)"
echo "   - PostgreSQL se ejecutará en puerto $DB_PORT (mapeado desde 5432 interno)"
echo "   - Puerto 3000 reservado para frontend"

echo ""
echo "✅ Archivo .env configurado. Por favor configura las credenciales de Cloudinary."
echo "   Edita el archivo .env y actualiza:"
echo "   - CLOUDINARY_CLOUD_NAME"
echo "   - CLOUDINARY_API_KEY" 
echo "   - CLOUDINARY_API_SECRET"
echo ""
echo "   Puedes obtener estas credenciales en: https://cloudinary.com"
echo ""
read -p "¿Has configurado las credenciales de Cloudinary? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Por favor configura las credenciales de Cloudinary antes de continuar."
    exit 1
fi

# Limpiar dependencias locales para evitar problemas de arquitectura
echo "🧹 Limpiando dependencias locales..."
if [ -d "node_modules" ]; then
    echo "   - Eliminando node_modules existente..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    echo "   - Eliminando package-lock.json existente..."
    rm -f package-lock.json
fi

# No es necesario manejar dist localmente, se genera en el contenedor

echo "✅ Dependencias locales limpiadas"

# Verificar y limpiar solo contenedores específicos de RealState
clean_realstate_containers

# Construir y ejecutar contenedores
echo "🔨 Construyendo contenedores..."
docker-compose build --no-cache

echo "🚀 Iniciando servicios..."
docker-compose up -d

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 15

# Verificar que PostgreSQL esté funcionando
echo "🔍 Verificando conexión a PostgreSQL..."
for i in {1..30}; do
    if docker-compose exec postgres pg_isready -U realstate -d realstate_db >/dev/null 2>&1; then
        echo "✅ PostgreSQL está listo"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ PostgreSQL no está respondiendo después de 30 intentos"
        echo "📋 Logs de PostgreSQL:"
        docker-compose logs postgres
        exit 1
    fi
    echo "⏳ Esperando PostgreSQL... (intento $i/30)"
    sleep 2
done

# Verificar que la API esté funcionando de manera inteligente
echo "🔍 Verificando que la API esté funcionando..."

# Verificar que la carpeta dist existe en el contenedor
echo "🔍 Verificando carpeta dist en el contenedor..."
if ! docker-compose exec api test -d "dist" 2>/dev/null; then
    echo "⚠️  Carpeta dist no encontrada en el contenedor, recompilando..."
    if ! docker-compose exec api npm run build; then
        echo "❌ Error recompilando la aplicación"
        echo "📋 Logs de la API:"
        docker-compose logs api
        exit 1
    fi
    echo "✅ Recompilación completada"
else
    echo "✅ Carpeta dist encontrada en el contenedor"
fi

# Verificar que la API responda (verificación rápida)
echo "🔍 Verificando que la API responda..."
if curl -s http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
    echo "✅ API está funcionando correctamente"
else
    echo "⚠️  API no responde, pero continuando con la configuración..."
fi

# Sincronizar esquema de base de datos (sin crear migraciones)
echo "🗄️  Sincronizando esquema de base de datos..."
if ! docker-compose exec api npx prisma db push; then
    echo "❌ Error sincronizando esquema de base de datos"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
if ! docker-compose exec api npx prisma generate; then
    echo "❌ Error generando cliente Prisma"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Regenerar cliente Prisma con nuevos binaryTargets
echo "🔄 Regenerando cliente Prisma con binaryTargets actualizados..."
if ! docker-compose exec api npx prisma generate; then
    echo "❌ Error regenerando cliente Prisma"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Verificación final de la API (opcional)
echo "🔍 Verificación final de la API..."
if curl -s http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
    echo "✅ API GraphQL está completamente lista"
else
    echo "⚠️  API no responde, pero continuando con el seed..."
fi

# Crear usuarios por defecto
echo "👥 Creando datos completos del sistema..."
if ! docker-compose exec api npm run db:seed; then
    echo "❌ Error ejecutando seed"
    echo "📋 Logs de la API:"
    docker-compose logs api
    exit 1
fi

# Verificación final de que la API esté funcionando
echo "🔍 Verificación final de la API..."
sleep 10

# Verificar que la API responda correctamente
echo "⏳ Verificando que la API responda correctamente..."
for i in {1..10}; do
    if curl -s http://localhost:$API_PORT/api/v1/graphql >/dev/null 2>&1; then
        echo "✅ API GraphQL está funcionando correctamente"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "⚠️  API no responde, pero los servicios están ejecutándose"
        echo "   Puedes verificar los logs con: docker-compose logs -f api"
        break
    fi
    echo "⏳ Verificando API... (intento $i/10)"
    sleep 3
done

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "🌐 URLs disponibles:"
echo "   - API GraphQL: http://localhost:$API_PORT/api/v1/graphql"
echo "   - Frontend: http://localhost:3000 (reservado para tu aplicación frontend)"
echo "   - Base de datos: localhost:5432"
echo ""
echo "👤 Usuarios disponibles para testing:"
echo "   - Guest:      guest@realstate.com      / realstate123"
echo "   - Executive:  executive@realstate.com  / realstate123"
echo "   - Admin:      admin@realstate.com      / realstate123"
echo "   - Owner:      owner@realstate.com      / realstate123"
echo ""
echo "📋 Comandos útiles:"
echo "   - Ver logs: docker-compose logs -f api"
echo "   - Parar servicios: docker-compose down"
echo "   - Reiniciar API: docker-compose restart api"
echo "   - Acceder a base de datos: docker-compose exec postgres psql -U realstate -d realstate_db"
echo "   - Recrear usuarios: docker-compose exec api npm run db:seed"
echo ""
echo "🔧 Configuración de puertos:"
echo "   - API: Puerto $API_PORT (mapeado desde 5000 interno)"
echo "   - Puerto 3000: Reservado para frontend"
echo ""
echo "🎉 ¡La API RealState está lista para usar!"