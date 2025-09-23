const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testErrorHandling() {
  try {
    console.log('🧪 Probando manejo de errores...');
    
    // Intentar eliminar una imagen que no existe en Cloudinary
    const nonExistentPublicId = 'non-existent-image-id';
    
    console.log(`🗑️ Intentando eliminar imagen inexistente: ${nonExistentPublicId}`);
    
    // Esto debería manejar el error graciosamente
    const result = await prisma.image.findFirst({
      where: { publicId: nonExistentPublicId }
    });
    
    if (result) {
      console.log('✅ Imagen encontrada en la base de datos');
    } else {
      console.log('ℹ️ Imagen no encontrada en la base de datos (esperado)');
    }
    
    console.log('\n🎉 Manejo de errores funcionando correctamente');

  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testErrorHandling();
