const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixHighlightedImageOrder() {
  try {
    console.log('🔧 Corrigiendo orden de imagen destacada...');
    
    const propertyId = 'e0028ce4-6d68-43cb-83fb-61c20703624b';
    
    // Obtener imagen destacada
    const highlightedImage = await prisma.image.findFirst({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
        isHighlighted: true,
      },
    });
    
    if (highlightedImage) {
      console.log(`📸 Imagen destacada encontrada: ${highlightedImage.id}`);
      console.log(`   - Orden actual: ${highlightedImage.order}`);
      console.log(`   - isHighlighted: ${highlightedImage.isHighlighted}`);
      
      // Corregir el orden a null
      await prisma.image.update({
        where: { id: highlightedImage.id },
        data: { order: null },
      });
      
      console.log('✅ Imagen destacada corregida: order = null');
    } else {
      console.log('❌ No se encontró imagen destacada');
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
    
    console.log('\n📸 Imágenes después de la corrección:');
    updatedImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id}`);
      console.log(`   - isHighlighted: ${img.isHighlighted}`);
      console.log(`   - order: ${img.order}`);
    });
    
    console.log('\n🎉 ¡Corrección completada!');

  } catch (error) {
    console.error('❌ Error durante la corrección:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixHighlightedImageOrder();
