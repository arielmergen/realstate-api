import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed completo de RealState API...');

  // 1. CREAR ROLES
  console.log('📋 Creando roles...');
  
  const guestRole = await prisma.role.upsert({
    where: { id: 'guest-role-id' },
    update: {},
    create: {
      id: 'guest-role-id',
      name: 'Guest',
      description: 'Usuario invitado con acceso de solo lectura'
    }
  });

  const executiveRole = await prisma.role.upsert({
    where: { id: 'executive-role-id' },
    update: {},
    create: {
      id: 'executive-role-id',
      name: 'Executive',
      description: 'Ejecutivo con acceso a gestión de propiedades'
    }
  });

  const adminRole = await prisma.role.upsert({
    where: { id: 'admin-role-id' },
    update: {},
    create: {
      id: 'admin-role-id',
      name: 'Admin',
      description: 'Administrador con acceso completo al sistema'
    }
  });

  const ownerRole = await prisma.role.upsert({
    where: { id: 'owner-role-id' },
    update: {},
    create: {
      id: 'owner-role-id',
      name: 'Owner',
      description: 'Propietario con acceso total y gestión de usuarios'
    }
  });

  console.log('✅ Roles creados/verificados');

  // 2. CREAR USUARIOS
  console.log('👥 Creando usuarios...');
  
  const defaultPassword = await bcrypt.hash('realstate123', 10);

  const guestUser = await prisma.user.upsert({
    where: { email: 'guest@realstate.com' },
    update: {},
    create: {
      email: 'guest@realstate.com',
      firstName: 'Usuario',
      lastName: 'Invitado',
      password: defaultPassword,
      phone: 1234567890,
      roleId: guestRole.id,
      username: 'guest'
    }
  });

  const executiveUser = await prisma.user.upsert({
    where: { email: 'executive@realstate.com' },
    update: {},
    create: {
      email: 'executive@realstate.com',
      firstName: 'María',
      lastName: 'González',
      password: defaultPassword,
      phone: 1234567891,
      roleId: executiveRole.id,
      username: 'maria.gonzalez'
    }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@realstate.com' },
    update: {},
    create: {
      email: 'admin@realstate.com',
      firstName: 'Carlos',
      lastName: 'Administrador',
      password: defaultPassword,
      phone: 1234567892,
      roleId: adminRole.id,
      username: 'carlos.admin'
    }
  });

  const ownerUser = await prisma.user.upsert({
    where: { email: 'owner@realstate.com' },
    update: {},
    create: {
      email: 'owner@realstate.com',
      firstName: 'Ana',
      lastName: 'Propietaria',
      password: defaultPassword,
      phone: 1234567893,
      roleId: ownerRole.id,
      username: 'ana.owner'
    }
  });

  console.log('✅ Usuarios creados/verificados');

  // 3. CONFIGURACIÓN GENERAL
  console.log('⚙️ Creando configuración general...');
  
  await prisma.generalConfiguration.upsert({
    where: { id: 'default-config' },
    update: {},
    create: {
      id: 'default-config',
      address: 'Av. Principal 123, Ciudad',
      copyright: '© 2024 RealState - Todos los derechos reservados',
      email: 'info@realstate.com',
      facebook: 'https://facebook.com/realstate',
      instagram: 'https://instagram.com/realstate',
      linkedin: 'https://linkedin.com/company/realstate',
      phone: 1234567890,
      whatsapp: 1234567890,
      facebookPixel: '',
      gtm: ''
    }
  });

  console.log('✅ Configuración general creada');

  // 4. TIPOS DE PROPIEDADES
  console.log('🏠 Creando tipos de propiedades...');
  
  const propertyTypes = [
    { id: 'casa-type-id', name: 'Casa', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] },
    { id: 'depto-type-id', name: 'Departamento', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] },
    { id: 'oficina-type-id', name: 'Oficina', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] },
    { id: 'local-type-id', name: 'Local Comercial', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] },
    { id: 'terreno-type-id', name: 'Terreno', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] },
    { id: 'cochera-type-id', name: 'Cochera', states: ['Vendida', 'Reservada', 'Disponible', 'Alquilada'] }
  ];

  for (const type of propertyTypes) {
    await prisma.propertyType.upsert({
      where: { id: type.id },
      update: {},
      create: {
        id: type.id,
        name: type.name,
        states: type.states
      }
    });
  }

  console.log('✅ Tipos de propiedades creados');

  // 5. AMENIDADES
  console.log('🏊 Creando amenidades...');
  
  const amenities = [
    { id: 'piscina-amenity-id', name: 'Piscina', icon: '🏊‍♂️' },
    { id: 'gimnasio-amenity-id', name: 'Gimnasio', icon: '💪' },
    { id: 'parque-amenity-id', name: 'Parque', icon: '🌳' },
    { id: 'seguridad-amenity-id', name: 'Seguridad 24hs', icon: '🔒' },
    { id: 'cochera-amenity-id', name: 'Cochera', icon: '🚗' },
    { id: 'balcon-amenity-id', name: 'Balcón', icon: '🌅' },
    { id: 'terraza-amenity-id', name: 'Terraza', icon: '🏖️' },
    { id: 'jardin-amenity-id', name: 'Jardín', icon: '🌿' },
    { id: 'sum-amenity-id', name: 'Sum', icon: '🏢' },
    { id: 'lavadero-amenity-id', name: 'Lavadero', icon: '👕' },
    { id: 'quincho-amenity-id', name: 'Quincho', icon: '🍖' },
    { id: 'juegos-amenity-id', name: 'Sala de Juegos', icon: '🎮' }
  ];

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: {
        id: amenity.id,
        name: amenity.name,
        icon: amenity.icon
      }
    });
  }

  console.log('✅ Amenidades creadas');

  // 6. SERVICIOS
  console.log('🔧 Creando servicios...');
  
  const services = [
    { id: 'mantenimiento-service-id', name: 'Mantenimiento', icon: '🔧' },
    { id: 'limpieza-service-id', name: 'Limpieza', icon: '🧹' },
    { id: 'conserjeria-service-id', name: 'Conserjería', icon: '👨‍💼' },
    { id: 'lavanderia-service-id', name: 'Lavandería', icon: '👕' },
    { id: 'delivery-service-id', name: 'Delivery', icon: '📦' },
    { id: 'vigilancia-service-id', name: 'Vigilancia', icon: '👮‍♂️' },
    { id: 'jardineria-service-id', name: 'Jardinería', icon: '🌱' },
    { id: 'piscina-service-id', name: 'Piscina', icon: '🏊‍♂️' }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        name: service.name,
        icon: service.icon
      }
    });
  }

  console.log('✅ Servicios creados');

  // 7. ZONAS GEOGRÁFICAS
  console.log('🗺️ Creando zonas geográficas...');
  
  const zones = [
    { id: 'centro-zone-id', name: 'Centro' },
    { id: 'norte-zone-id', name: 'Norte' },
    { id: 'sur-zone-id', name: 'Sur' },
    { id: 'este-zone-id', name: 'Este' },
    { id: 'oeste-zone-id', name: 'Oeste' },
    { id: 'zona-norte-zone-id', name: 'Zona Norte' },
    { id: 'zona-sur-zone-id', name: 'Zona Sur' }
  ];

  const createdZones = [];
  for (const zone of zones) {
    const createdZone = await prisma.zone.upsert({
      where: { id: zone.id },
      update: {},
      create: { 
        id: zone.id,
        name: zone.name 
      }
    });
    createdZones.push(createdZone);
  }

  console.log('✅ Zonas geográficas creadas');

  // 8. EMPRENDIMIENTOS
  console.log('🏘️ Creando emprendimientos...');
  
  const entrepreneurships = [
    { id: 'torres-centro-id', name: 'Torres del Centro', zoneId: createdZones[0].id },
    { id: 'residencial-norte-id', name: 'Residencial Norte', zoneId: createdZones[1].id },
    { id: 'complejo-sur-id', name: 'Complejo Sur', zoneId: createdZones[2].id },
    { id: 'urbanizacion-este-id', name: 'Urbanización Este', zoneId: createdZones[3].id },
    { id: 'barrio-oeste-id', name: 'Barrio Oeste', zoneId: createdZones[4].id }
  ];

  const createdEntrepreneurships = [];
  for (const entrepreneurship of entrepreneurships) {
    const created = await prisma.entrepreneurship.upsert({
      where: { id: entrepreneurship.id },
      update: {},
      create: {
        id: entrepreneurship.id,
        name: entrepreneurship.name,
        zoneId: entrepreneurship.zoneId
      }
    });
    createdEntrepreneurships.push(created);
  }

  console.log('✅ Emprendimientos creados');

  // 9. BARRIOS
  console.log('🏘️ Creando barrios...');
  
  const neighborhoods = [
    { id: 'barrio-centro-id', name: 'Barrio Centro', entrepreneurshipId: createdEntrepreneurships[0].id },
    { id: 'barrio-norte-id', name: 'Barrio Norte', entrepreneurshipId: createdEntrepreneurships[1].id },
    { id: 'barrio-sur-id', name: 'Barrio Sur', entrepreneurshipId: createdEntrepreneurships[2].id },
    { id: 'barrio-este-id', name: 'Barrio Este', entrepreneurshipId: createdEntrepreneurships[3].id },
    { id: 'barrio-oeste-id', name: 'Barrio Oeste', entrepreneurshipId: createdEntrepreneurships[4].id }
  ];

  for (const neighborhood of neighborhoods) {
    await prisma.neighborhood.upsert({
      where: { id: neighborhood.id },
      update: {},
      create: {
        id: neighborhood.id,
        name: neighborhood.name,
        entrepreneurshipId: neighborhood.entrepreneurshipId
      }
    });
  }

  console.log('✅ Barrios creados');

  // 10. PROPIETARIOS
  console.log('👨‍💼 Creando propietarios...');
  
  const owners = [
    { id: 'propietario1-id', email: 'propietario1@realstate.com', firstName: 'Juan', lastName: 'Pérez', phone: 1234567890 },
    { id: 'propietario2-id', email: 'propietario2@realstate.com', firstName: 'María', lastName: 'López', phone: 1234567891 },
    { id: 'propietario3-id', email: 'propietario3@realstate.com', firstName: 'Carlos', lastName: 'García', phone: 1234567892 },
    { id: 'propietario4-id', email: 'propietario4@realstate.com', firstName: 'Ana', lastName: 'Martínez', phone: 1234567893 }
  ];

  for (const owner of owners) {
    await prisma.owner.upsert({
      where: { id: owner.id },
      update: {},
      create: {
        id: owner.id,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName,
        phone: owner.phone
      }
    });
  }

  console.log('✅ Propietarios creados');

  // 11. CONFIGURACIÓN DEL HOME
  console.log('🏠 Creando configuración del home...');
  
  const homeConfig = await prisma.homeConfiguration.upsert({
    where: { id: 'default-home-config' },
    update: {},
    create: {
      id: 'default-home-config'
    }
  });

  console.log('✅ Configuración del home creada');

  // Mostrar resumen final
  console.log('\n🎉 ¡Seed completo finalizado!');
  console.log('\n📊 Resumen de datos creados:');
  console.log('┌─────────────────────────┬─────────┐');
  console.log('│ Componente              │ Cantidad│');
  console.log('├─────────────────────────┼─────────┤');
  console.log('│ Roles                   │ 4       │');
  console.log('│ Usuarios                │ 4       │');
  console.log('│ Configuración General   │ 1       │');
  console.log('│ Tipos de Propiedades    │ 6       │');
  console.log('│ Amenidades              │ 12      │');
  console.log('│ Servicios               │ 8       │');
  console.log('│ Zonas Geográficas       │ 7       │');
  console.log('│ Emprendimientos         │ 5       │');
  console.log('│ Barrios                 │ 5       │');
  console.log('│ Propietarios            │ 4       │');
  console.log('│ Configuración Home      │ 1       │');
  console.log('└─────────────────────────┴─────────┘');
  
  console.log('\n👤 Usuarios disponibles:');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ ROL        │ EMAIL                    │ PASSWORD        │');
  console.log('├─────────────────────────────────────────────────────────┤');
  console.log('│ Guest      │ guest@realstate.com      │ realstate123    │');
  console.log('│ Executive  │ executive@realstate.com  │ realstate123    │');
  console.log('│ Admin      │ admin@realstate.com      │ realstate123    │');
  console.log('│ Owner      │ owner@realstate.com      │ realstate123    │');
  console.log('└─────────────────────────────────────────────────────────┘');
  
  console.log('\n🌐 URLs disponibles:');
  console.log('   - API GraphQL: http://localhost:3001/realstate');
  console.log('   - Frontend: http://localhost:3000 (reservado)');
  console.log('   - Base de datos: localhost:5432');
  
  console.log('\n🎯 ¡La API RealState está completamente configurada y lista para usar!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });