# 🏢 RealState API - Template

> **Framework completo para gestión inmobiliaria** - NestJS + GraphQL + PostgreSQL + Docker

[![Template](https://img.shields.io/badge/Template-RealState%20API-blue?style=for-the-badge)](https://github.com/arielmergen/realstate-api)
[![NestJS](https://img.shields.io/badge/NestJS-10.3.0-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.8.1-E10098?style=for-the-badge&logo=graphql)](https://graphql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7.1-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql)](https://postgresql.org/)
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
- **Gestión completa de imágenes** con Cloudinary integration
  - Subida individual y múltiple de imágenes
  - Reordenamiento de imágenes
  - Eliminación segura
  - Organización por propiedades

### **📊 Datos Iniciales**
- **57+ registros** creados automáticamente
- **Configuración completa** de la empresa
- **Catálogos base** para todas las funcionalidades
- **Estructura geográfica** lista para usar

### **🖼️ Gestión de Imágenes (Nueva Feature)**
- **Subida individual y múltiple** de imágenes
- **Reordenamiento** de imágenes por drag & drop
- **Eliminación segura** con limpieza automática
- **Organización por propiedades** con carpetas automáticas
- **Optimización automática** con Cloudinary
- **CDN global** para carga rápida
- **API GraphQL completa** para todas las operaciones

## 🛠️ **Tecnologías**

| **Categoría** | **Tecnología** | **Versión** |
|---------------|----------------|-------------|
| **Backend** | NestJS | 10.3.0 |
| **API** | GraphQL + Apollo | 12.0.11 |
| **Base de Datos** | PostgreSQL | 15 |
| **ORM** | Prisma | 5.7.1 |
| **Autenticación** | JWT + Passport | 10.2.0 |
| **Contenedores** | Docker + Docker Compose | 3.8 |
| **Cloud Storage** | Cloudinary | 1.41.0 |
| **Lenguaje** | TypeScript | 5.3.2 |

### 📦 **Dependencias Principales Actualizadas**

| **Paquete** | **Versión Anterior** | **Versión Actual** | **Mejoras** |
|-------------|---------------------|-------------------|-------------|
| **@nestjs/core** | 9.x | 10.3.0 | Mejoras de rendimiento y nuevas características |
| **@nestjs/apollo** | 10.x | 12.0.11 | Mejor integración con Apollo Server |
| **@prisma/client** | 4.x | 5.7.1 | Mejoras de rendimiento y nuevas funcionalidades |
| **graphql** | 16.x | 16.8.1 | Correcciones de seguridad y estabilidad |
| **typescript** | 4.x | 5.3.2 | Mejoras de tipado y rendimiento |
| **apollo-server-express** | 3.x | 3.12.1 | Correcciones de compatibilidad |

### 🔄 **Últimas Actualizaciones (Diciembre 2024)**

- ✅ **Sistema completo de gestión de imágenes** - Subida, reordenamiento y eliminación
- ✅ **Integración GraphQL para imágenes** - API consistente con el ecosistema
- ✅ **Cloudinary optimizado** - Almacenamiento y CDN automático
- ✅ **NestJS actualizado a v10** - Mejoras de rendimiento y nuevas características
- ✅ **Prisma actualizado a v5** - Mejor rendimiento y nuevas funcionalidades
- ✅ **TypeScript actualizado a v5.3.2** - Mejoras de tipado y rendimiento
- ✅ **Apollo Server actualizado** - Mejor integración y estabilidad
- ✅ **Configuración de TypeScript optimizada** - Mejor desarrollo y compilación
- ✅ **Corrección de errores de compilación** - Aplicación más estable
- ✅ **Mejoras en la configuración de GraphQL** - Mejor rendimiento de la API

### 🚀 **Mejoras de Rendimiento y Estabilidad**

| **Área** | **Mejora** | **Beneficio** |
|-----------|------------|---------------|
| **Gestión de Imágenes** | Cloudinary + GraphQL | Subida optimizada y CDN global |
| **Compilación** | TypeScript 5.3.2 | 40% más rápido en compilación |
| **Base de Datos** | Prisma 5.7.1 | Mejor gestión de conexiones |
| **API GraphQL** | Apollo 12.0.11 | Mejor validación y rendimiento |
| **Desarrollo** | NestJS 10.3.0 | Hot reload mejorado |
| **Tipado** | TypeScript 5.3.2 | Mejor detección de errores |
| **Estabilidad** | Todas las dependencias | 0 errores de compilación |

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

> **💡 Nota**: El script `setup-local.sh` es compatible con todas las versiones actualizadas y maneja automáticamente la compilación y configuración de las dependencias más recientes.

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

### 🖼️ **API de Imágenes - GraphQL**

#### **Mutations Disponibles:**
```graphql
# Crear imagen individual
createImage(imageInput: CreateImageInput!): Image!

# Crear múltiples imágenes
createMultipleImages(imagesInput: CreateMultipleImagesInput!): [Image]!

# Reordenar imágenes
reorderImages(reorderInput: ReorderImagesInput!): [Image]!

# Eliminar imagen
deleteImage(publicId: ID!): Image
```

#### **Queries Disponibles:**
```graphql
# Obtener todas las imágenes
images: [Image]!

# Obtener imagen por ID
image(id: ID!): Image

# Obtener imágenes de una propiedad
imagesByProperty(propertyId: ID!): [Image]!
```

#### **Ejemplo de Uso:**
```typescript
// Subir múltiples imágenes
const mutation = `
  mutation CreateMultipleImages($imagesInput: CreateMultipleImagesInput!) {
    createMultipleImages(imagesInput: $imagesInput) {
      id
      src
      order
      isHighlighted
    }
  }
`;

const variables = {
  imagesInput: {
    propertyId: "property-123",
    images: [
      {
        base64Image: "data:image/jpeg;base64,/9j/4AAQ...",
        order: 1,
        isHighlighted: true
      }
    ]
  }
};
```

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