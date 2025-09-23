const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugImageOrder() {
  try {
    console.log('🔍 Debugging imagen destacada...');
    
    const propertyId = 'e0028ce4-6d68-43cb-83fb-61c20703624b';
    
    // Obtener imagen destacada directamente
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
    
    console.log('📸 Imagen destacada en la base de datos:');
    console.log(`   - ID: ${highlightedImage.id}`);
    console.log(`   - isHighlighted: ${highlightedImage.isHighlighted}`);
    console.log(`   - order: ${highlightedImage.order}`);
    console.log(`   - order type: ${typeof highlightedImage.order}`);
    console.log(`   - order === null: ${highlightedImage.order === null}`);
    console.log(`   - order === undefined: ${highlightedImage.order === undefined}`);
    
    // Obtener todas las imágenes de la propiedad
    const allImages = await prisma.image.findMany({
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
    
    console.log('\n📸 Todas las imágenes de la propiedad:');
    allImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.id}`);
      console.log(`   - isHighlighted: ${img.isHighlighted}`);
      console.log(`   - order: ${img.order} (${typeof img.order})`);
    });
    
    // Verificar si hay algún problema con la serialización
    console.log('\n🔍 Verificación de serialización:');
    const jsonString = JSON.stringify(highlightedImage);
    console.log(`JSON string: ${jsonString}`);
    
    const parsed = JSON.parse(jsonString);
    console.log(`Parsed order: ${parsed.order} (${typeof parsed.order})`);

  } catch (error) {
    console.error('❌ Error durante el debug:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugImageOrder();
