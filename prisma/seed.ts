import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de usuarios por defecto...');

  // Crear roles si no existen
  console.log('📋 Creando roles...');
  
  const guestRole = await prisma.role.upsert({
    where: { name: 'Guest' },
    update: {},
    create: {
      name: 'Guest',
      description: 'Usuario invitado con acceso de solo lectura'
    }
  });

  const executiveRole = await prisma.role.upsert({
    where: { name: 'Executive' },
    update: {},
    create: {
      name: 'Executive',
      description: 'Ejecutivo con acceso a gestión de propiedades'
    }
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrador con acceso completo al sistema'
    }
  });

  const ownerRole = await prisma.role.upsert({
    where: { name: 'Owner' },
    update: {},
    create: {
      name: 'Owner',
      description: 'Propietario con acceso total y gestión de usuarios'
    }
  });

  console.log('✅ Roles creados/verificados');

  // Hash de contraseña por defecto
  const defaultPassword = await bcrypt.hash('realstate123', 10);

  // Crear usuarios por defecto
  console.log('👥 Creando usuarios por defecto...');

  // Usuario Guest
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

  // Usuario Executive
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

  // Usuario Admin
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

  // Usuario Owner
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

  // Mostrar resumen
  console.log('\n🎉 ¡Seed completado!');
  console.log('\n📋 Usuarios disponibles:');
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ ROL        │ EMAIL                    │ PASSWORD        │');
  console.log('├─────────────────────────────────────────────────────────┤');
  console.log('│ Guest      │ guest@realstate.com      │ realstate123    │');
  console.log('│ Executive  │ executive@realstate.com  │ realstate123    │');
  console.log('│ Admin      │ admin@realstate.com      │ realstate123    │');
  console.log('│ Owner      │ owner@realstate.com      │ realstate123    │');
  console.log('└─────────────────────────────────────────────────────────┘');
  console.log('\n🌐 Puedes probar la API en: http://localhost:3001/realstate');
  console.log('🔑 Usa cualquiera de estos usuarios para hacer login');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
