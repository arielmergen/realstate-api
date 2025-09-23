const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectImagesToProperties() {
  try {
    console.log('🔗 Conectando imágenes a propiedades...');
    
    // Obtener todas las propiedades
    const properties = await prisma.property.findMany({
      select: { id: true, title: true }
    });
    
    console.log(`📊 Encontradas ${properties.length} propiedades`);
    
    // Obtener todas las imágenes sin propiedades
    const images = await prisma.image.findMany({
      where: {
        properties: {
          none: {}
        }
      },
      select: { id: true, src: true, order: true, isHighlighted: true }
    });
    
    console.log(`📊 Encontradas ${images.length} imágenes sin propiedades`);
    
    // Conectar las primeras 4 imágenes a la primera propiedad
    if (properties.length > 0 && images.length > 0) {
      const propertyId = properties[0].id;
      const imagesToConnect = images.slice(0, 4);
      
      console.log(`🔗 Conectando ${imagesToConnect.length} imágenes a la propiedad ${propertyId}`);
      
      for (const image of imagesToConnect) {
        await prisma.image.update({
          where: { id: image.id },
          data: {
            properties: {
              connect: { id: propertyId }
            }
          }
        });
        
        console.log(`✅ Imagen ${image.id} conectada`);
      }
      
      console.log('🎉 ¡Imágenes conectadas exitosamente!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

connectImagesToProperties();
