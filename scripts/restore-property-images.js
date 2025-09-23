const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function restorePropertyImages() {
  try {
    console.log('🔄 Restaurando imágenes de la propiedad Casa Hermosa...');
    
    const propertyId = 'e0028ce4-6d68-43cb-83fb-61c20703624b';
    
    // Obtener las primeras 4 imágenes para conectar a la propiedad
    const images = await prisma.image.findMany({
      take: 4,
      orderBy: {
        order: 'asc'
      }
    });
    
    console.log(`📸 Conectando ${images.length} imágenes a la propiedad...`);
    
    // Conectar las imágenes a la propiedad
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const isHighlighted = i === 0; // Primera imagen destacada
      const order = i + 1;
      
      await prisma.image.update({
        where: { id: image.id },
        data: {
          properties: {
            connect: { id: propertyId }
          },
          isHighlighted,
          order
        }
      });
      
      console.log(`✅ Imagen ${i + 1}: ${image.id} - Orden: ${order}, Destacada: ${isHighlighted}`);
    }
    
    // Verificar el resultado
    const propertyImages = await prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });
    
    console.log(`\n📊 Resultado final:`);
    console.log(`- Imágenes conectadas: ${propertyImages.length}`);
    console.log(`- Imágenes destacadas: ${propertyImages.filter(img => img.isHighlighted).length}`);
    console.log(`- Orden: ${propertyImages.map(img => img.order).join(', ')}`);
    
    console.log('\n🎉 ¡Imágenes restauradas correctamente!');
    
  } catch (error) {
    console.error('❌ Error durante la restauración:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restorePropertyImages();
