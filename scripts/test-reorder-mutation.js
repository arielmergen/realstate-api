const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testReorderMutation() {
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
    
    console.log('📸 Imágenes ANTES del reordenamiento:');
    currentImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id} - Orden: ${img.order}, Destacada: ${img.isHighlighted}`);
    });
    
    // Simular el reordenamiento que envía el frontend
    const reorderInput = {
      images: [
        { imageId: "a7c63a20-f629-4451-8e47-ae606b69e07d", order: 3 }, // 1 -> 3
        { imageId: "834f30cc-4326-40c1-a08d-9e71c7587b6e", order: 1 }, // 2 -> 1
        { imageId: "bdf94ea7-fd90-44a0-8665-8f114c219bee", order: 2 }, // 3 -> 2
      ]
    };
    
    console.log('\n🔄 Aplicando reordenamiento...');
    
    // Aplicar el reordenamiento
    for (const { imageId, order } of reorderInput.images) {
      await prisma.image.update({
        where: { id: imageId },
        data: { order },
      });
      console.log(`✅ Imagen ${imageId} -> Orden ${order}`);
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
    
    console.log('\n📸 Imágenes DESPUÉS del reordenamiento:');
    updatedImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id} - Orden: ${img.order}, Destacada: ${img.isHighlighted}`);
    });
    
    // Verificar que el orden es correcto
    const galleryImages = updatedImages.filter(img => !img.isHighlighted);
    const expectedOrder = [1, 2, 3];
    const actualOrder = galleryImages.map(img => img.order);
    
    console.log('\n🔍 Verificación del orden:');
    console.log(`Orden esperado: [${expectedOrder.join(', ')}]`);
    console.log(`Orden actual: [${actualOrder.join(', ')}]`);
    console.log(`¿Orden correcto? ${JSON.stringify(expectedOrder) === JSON.stringify(actualOrder) ? '✅ SÍ' : '❌ NO'}`);
    
    console.log('\n🎉 ¡Reordenamiento completado!');

  } catch (error) {
    console.error('❌ Error durante el reordenamiento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReorderMutation();
