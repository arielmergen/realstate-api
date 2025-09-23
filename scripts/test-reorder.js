const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testReorder() {
  try {
    console.log('🔄 Probando reordenamiento de imágenes...');
    
    const propertyId = 'e0028ce4-6d68-43cb-83fb-61c20703624b';
    
    // Obtener imágenes actuales
    const currentImages = await prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
      },
      orderBy: [
        {
          isHighlighted: 'desc',
        },
        {
          order: 'asc',
        },
      ],
    });
    
    console.log('📸 Imágenes actuales:');
    currentImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id} - Orden: ${img.order}, Destacada: ${img.isHighlighted}`);
    });
    
    // Reordenar las imágenes de galería (excluyendo la destacada)
    const galleryImages = currentImages.filter(img => !img.isHighlighted);
    
    console.log('\n🔄 Reordenando galería...');
    
    // Cambiar el orden: 1->3, 2->1, 3->2
    const newOrder = [
      { id: galleryImages[0].id, order: 3 }, // Primera imagen -> orden 3
      { id: galleryImages[1].id, order: 1 }, // Segunda imagen -> orden 1
      { id: galleryImages[2].id, order: 2 }, // Tercera imagen -> orden 2
    ];
    
    for (const { id, order } of newOrder) {
      await prisma.image.update({
        where: { id },
        data: { order },
      });
      console.log(`✅ Imagen ${id} -> Orden ${order}`);
    }
    
    // Verificar el resultado
    const updatedImages = await prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
      },
      orderBy: [
        {
          isHighlighted: 'desc',
        },
        {
          order: 'asc',
        },
      ],
    });
    
    console.log('\n📸 Imágenes después del reordenamiento:');
    updatedImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id} - Orden: ${img.order}, Destacada: ${img.isHighlighted}`);
    });
    
    console.log('\n🎉 ¡Reordenamiento completado!');

  } catch (error) {
    console.error('❌ Error durante el reordenamiento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReorder();
