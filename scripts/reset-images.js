const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetImages() {
  try {
    console.log('🧹 Iniciando reset completo de imágenes...');
    
    // 1. Desconectar todas las imágenes de todas las propiedades
    console.log('🔗 Desconectando todas las imágenes de propiedades...');
    
    // Obtener todas las imágenes
    const allImages = await prisma.image.findMany({
      select: { id: true, publicId: true }
    });
    
    console.log(`📸 Encontradas ${allImages.length} imágenes`);
    
    // Desconectar todas las imágenes de propiedades
    for (const image of allImages) {
      await prisma.image.update({
        where: { id: image.id },
        data: {
          properties: {
            set: []
          }
        }
      });
    }
    
    console.log('✅ Todas las imágenes desconectadas de propiedades');
    
    // 2. Mostrar resumen
    const totalImages = await prisma.image.count();
    const imagesWithProperties = await prisma.image.count({
      where: {
        properties: {
          some: {}
        }
      }
    });
    
    console.log(`\n📊 Resumen final:`);
    console.log(`- Total de imágenes: ${totalImages}`);
    console.log(`- Imágenes conectadas a propiedades: ${imagesWithProperties}`);
    console.log(`- Imágenes sin conectar: ${totalImages - imagesWithProperties}`);
    
    console.log('\n🎉 ¡Reset completado! Ahora el frontend puede cargar imágenes limpias.');
    
  } catch (error) {
    console.error('❌ Error durante el reset:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetImages();
