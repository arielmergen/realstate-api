const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyOrderingLogic() {
  try {
    console.log('🔍 Verificando lógica de ordenamiento...');
    
    const propertyId = 'e0028ce4-6d68-43cb-83fb-61c20703624b';
    
    // Obtener imágenes con el ordenamiento actual
    const images = await prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
      },
      orderBy: [
        {
          isHighlighted: 'desc', // Imágenes destacadas primero
        },
        {
          order: 'asc', // Luego por orden
        },
      ],
    });
    
    console.log('📸 Imágenes ordenadas:');
    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id}`);
      console.log(`   - isHighlighted: ${img.isHighlighted}`);
      console.log(`   - order: ${img.order}`);
      console.log(`   - alt: ${img.alt}`);
      console.log('');
    });
    
    // Verificar lógica
    const highlightedImages = images.filter(img => img.isHighlighted);
    const galleryImages = images.filter(img => !img.isHighlighted);
    
    console.log('🔍 Verificación de lógica:');
    console.log(`- Imágenes destacadas: ${highlightedImages.length}`);
    console.log(`- Imágenes de galería: ${galleryImages.length}`);
    
    // Verificar que solo haya una imagen destacada
    if (highlightedImages.length === 1) {
      console.log('✅ Solo una imagen destacada');
    } else {
      console.log(`❌ Múltiples imágenes destacadas: ${highlightedImages.length}`);
    }
    
    // Verificar que la imagen destacada tenga order: null
    const highlightedImage = highlightedImages[0];
    if (highlightedImage && highlightedImage.order === null) {
      console.log('✅ Imagen destacada tiene order: null');
    } else {
      console.log('❌ Imagen destacada no tiene order: null');
    }
    
    // Verificar que las imágenes de galería tengan orden secuencial
    const galleryOrders = galleryImages.map(img => img.order).sort((a, b) => a - b);
    const expectedOrders = Array.from({ length: galleryImages.length }, (_, i) => i + 1);
    
    if (JSON.stringify(galleryOrders) === JSON.stringify(expectedOrders)) {
      console.log('✅ Galería tiene orden secuencial correcto');
    } else {
      console.log('❌ Galería no tiene orden secuencial');
      console.log(`   - Orden actual: [${galleryOrders.join(', ')}]`);
      console.log(`   - Orden esperado: [${expectedOrders.join(', ')}]`);
    }
    
    // Verificar ordenamiento final
    console.log('\n🎯 Ordenamiento final:');
    console.log('1. Imagen destacada (isHighlighted: true, order: null)');
    console.log('2. Galería ordenada (isHighlighted: false, order: 1, 2, 3...)');
    
    const isCorrectOrder = 
      highlightedImages.length === 1 &&
      highlightedImage.order === null &&
      JSON.stringify(galleryOrders) === JSON.stringify(expectedOrders);
    
    console.log(`\n${isCorrectOrder ? '✅' : '❌'} Lógica de ordenamiento: ${isCorrectOrder ? 'CORRECTA' : 'INCORRECTA'}`);

  } catch (error) {
    console.error('❌ Error durante la verificación:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyOrderingLogic();
