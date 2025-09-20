# 🏢 RealState API - Template

> **Framework completo para gestión inmobiliaria** - NestJS + GraphQL + PostgreSQL + Docker

[![Template](https://img.shields.io/badge/Template-RealState%20API-blue?style=for-the-badge)](https://github.com/arielmergen/realstate-api)
[![NestJS](https://img.shields.io/badge/NestJS-8.0.0-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)](https://graphql.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)](https://docker.com/)

## 🚀 **Inicio Rápido**

### **Opción 1: Usar este Template (Recomendado)**

1. **Click en "Use this template"** (botón verde arriba)
2. **Crea tu repositorio** con el nombre que quieras
3. **Clona tu nuevo repositorio**
4. **Sigue las instrucciones** del [README-LOCAL.md](./README-LOCAL.md)

### **Opción 2: Clonar directamente**

```bash
git clone https://github.com/arielmergen/realstate-api.git mi-proyecto-inmobiliario
cd mi-proyecto-inmobiliario
chmod +x setup-local.sh
./setup-local.sh
```

## ✨ **Características**

### **🏗️ Arquitectura Moderna**
- **NestJS** - Framework Node.js escalable
- **GraphQL** - API flexible y eficiente
- **PostgreSQL** - Base de datos robusta
- **Prisma ORM** - ORM moderno y type-safe
- **Docker** - Contenedores para desarrollo

### **👥 Sistema de Usuarios**
- **4 roles predefinidos**: Guest, Executive, Admin, Owner
- **Autenticación JWT** con refresh tokens
- **Guards y decorators** para control de acceso
- **Usuarios de prueba** listos para usar

### **🏠 Gestión Inmobiliaria Completa**
- **Propiedades** con geolocalización
- **Amenidades y servicios** configurables
- **Tipos de propiedades** (Casa, Depto, Oficina, etc.)
- **Estructura geográfica** (Zonas, Emprendimientos, Barrios)
- **Propietarios** y gestión de contactos
- **Imágenes** con Cloudinary integration

### **📊 Datos Iniciales**
- **57+ registros** creados automáticamente
- **Configuración completa** de la empresa
- **Catálogos base** para todas las funcionalidades
- **Estructura geográfica** lista para usar

## 🛠️ **Tecnologías**

| **Categoría** | **Tecnología** | **Versión** |
|---------------|----------------|-------------|
| **Backend** | NestJS | 9.x |
| **API** | GraphQL + Apollo | 10.x |
| **Base de Datos** | PostgreSQL | 15 |
| **ORM** | Prisma | 4.x |
| **Autenticación** | JWT + Passport | 9.x |
| **Contenedores** | Docker + Docker Compose | 3.8 |
| **Cloud Storage** | Cloudinary | 1.x |
| **Lenguaje** | TypeScript | 4.x |

## 📁 **Estructura del Proyecto**

```
realstate-api/
├── src/
│   ├── resources/           # Módulos de la aplicación
│   │   ├── auth/           # Autenticación y autorización
│   │   ├── properties/     # Gestión de propiedades
│   │   ├── users/          # Gestión de usuarios
│   │   └── ...            # Otros módulos
│   ├── db/                # Configuración de base de datos
│   ├── guards/            # Guards de autenticación
│   └── decorators/        # Decorators personalizados
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts           # Datos iniciales
├── docker-compose.yml     # Configuración de contenedores
├── setup-local.sh        # Script de instalación automática
└── README-LOCAL.md       # Guía de instalación detallada
```

## 🚀 **Instalación**

### **Requisitos Previos**
- Docker y Docker Compose
- Git
- Cuenta de Cloudinary (gratuita)

### **Instalación Automática**
```bash
# 1. Clonar el template
git clone https://github.com/arielmergen/realstate-api.git mi-proyecto
cd mi-proyecto

# 2. Configurar Cloudinary
cp env.example .env
# Editar .env con tus credenciales de Cloudinary

# 3. Instalar y ejecutar
chmod +x setup-local.sh
./setup-local.sh
```

### **¡Listo!** 🎉
- **API GraphQL**: http://localhost:3002/api/v1/graphql (puerto automático si 3002 está ocupado)
- **Base de datos**: localhost:5432
- **57+ registros** creados automáticamente
- **Puerto 3000 reservado** para tu aplicación frontend

### **🚀 Uso Diario**
```bash
# Iniciar servicios (usa puerto configurado en .env)
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar servicios
docker-compose down
```

### **🔧 Configuración de Puertos**
- **API**: Puerto 3002 (externo) → 5000 (interno)
- **Frontend**: Puerto 3000 (reservado)
- **PostgreSQL**: Puerto 5432

## 📚 **Documentación**

- **[Guía de Instalación](./README-LOCAL.md)** - Instalación paso a paso
- **[Plan de Implementación](./documents/plan-implementacion-local.md)** - Documentación técnica
- **[Informe Técnico](./documents/informe-tecnico-realstate-api.md)** - Análisis completo
- **[Guía de Configuración](./documents/guia-configuracion-realstate.md)** - Configuración avanzada

## 👥 **Usuarios de Prueba**

| **Rol** | **Email** | **Password** | **Permisos** |
|---------|-----------|--------------|--------------|
| **Guest** | `guest@realstate.com` | `realstate123` | Solo lectura |
| **Executive** | `executive@realstate.com` | `realstate123` | CRUD propiedades |
| **Admin** | `admin@realstate.com` | `realstate123` | Acceso completo |
| **Owner** | `owner@realstate.com` | `realstate123` | Control total |

### 🌐 **URLs Disponibles**

| **Servicio** | **URL** | **Descripción** |
|--------------|---------|-----------------|
| **API GraphQL** | http://localhost:3002/api/v1/graphql | Endpoint principal de la API |
| **Frontend** | http://localhost:3000 | Interfaz de usuario (reservado) |
| **Base de Datos** | localhost:5432 | PostgreSQL directo |

## 🔧 **Comandos Útiles**

```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs de la API
docker-compose logs -f api

# Reiniciar servicios
docker-compose restart api

# Acceder a la base de datos
docker-compose exec postgres psql -U realstate -d realstate_db

# GESTIÓN DE DATOS (IMPORTANTE!)
# Recrear datos iniciales (necesario después de la primera instalación)
docker-compose exec api npm run db:seed

# Si no ves datos en la API, ejecuta:
docker-compose exec api npm run db:seed

# Resetear base de datos completamente (limpia todo y recrea)
docker-compose exec postgres psql -U realstate -d realstate_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
docker-compose exec api npm run prisma:migrate
docker-compose exec api npm run db:seed

# Verificar que hay datos en la base
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT COUNT(*) FROM \"User\";"

# Ver todas las tablas
docker-compose exec postgres psql -U realstate -d realstate_db -c "\dt"

# Parar todos los servicios
docker-compose down

# Limpiar completamente Docker (si hay conflictos)
./clean-docker.sh
```

### ⚠️ **Problema Común: No se ven datos**

Si después de levantar la API no ves datos:

```bash
# Solución rápida
docker-compose exec api npm run db:seed

# Si sigue sin funcionar, reset completo
docker-compose down
docker-compose up -d
docker-compose exec api npm run db:seed
```

## 🤝 **Contribuir**

Este es un template, pero si encuentras mejoras:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature
3. **Commit** tus cambios
4. **Push** a la rama
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 **Soporte**

- **Issues**: [GitHub Issues](https://github.com/arielmergen/realstate-api/issues)
- **Documentación**: [README-LOCAL.md](./README-LOCAL.md)
- **Email**: [tu-email@ejemplo.com]

---

**¿Te gusta este template?** ⭐ **¡Dale una estrella!** ⭐

**Creado con ❤️ para la comunidad de desarrolladores**