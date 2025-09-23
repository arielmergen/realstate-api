const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupOrphanedImages() {
  try {
    console.log('🧹 Limpiando referencias de imágenes huérfanas...');
    
    // Obtener todas las imágenes
    const images = await prisma.image.findMany({
      include: {
        properties: true,
      },
    });
    
    console.log(`📸 Encontradas ${images.length} imágenes en la base de datos`);
    
    let cleanedCount = 0;
    let errorCount = 0;
    
    for (const image of images) {
      try {
        // Verificar si la imagen existe en Cloudinary
        const cloudinary = require('cloudinary').v2;
        await cloudinary.api.resource(image.publicId);
        
        console.log(`✅ Imagen ${image.publicId} existe en Cloudinary`);
      } catch (error) {
        if (error.http_code === 404) {
          console.log(`❌ Imagen ${image.publicId} NO existe en Cloudinary`);
          
          // Verificar si es imagen destacada
          if (image.isHighlighted) {
            console.log(`⭐ Imagen destacada huérfana encontrada: ${image.id}`);
            
            // Desmarcar como destacada
            await prisma.image.update({
              where: { id: image.id },
              data: { 
                isHighlighted: false,
                order: null 
              },
            });
            
            console.log(`✅ Imagen destacada desmarcada: ${image.id}`);
          }
          
          // Eliminar de la base de datos
          await prisma.image.delete({
            where: { id: image.id },
          });
          
          console.log(`🗑️ Imagen eliminada de la base de datos: ${image.id}`);
          cleanedCount++;
        } else {
          console.log(`⚠️ Error al verificar imagen ${image.publicId}:`, error.message);
          errorCount++;
        }
      }
    }
    
    console.log(`\n📊 Resumen de limpieza:`);
    console.log(`- Imágenes limpiadas: ${cleanedCount}`);
    console.log(`- Errores encontrados: ${errorCount}`);
    console.log(`- Total procesadas: ${images.length}`);
    
    // Verificar propiedades que quedaron sin imágenes destacadas
    const propertiesWithoutHighlighted = await prisma.property.findMany({
      where: {
        images: {
          none: {
            isHighlighted: true,
          },
        },
      },
      include: {
        images: true,
      },
    });
    
    console.log(`\n🔍 Propiedades sin imagen destacada: ${propertiesWithoutHighlighted.length}`);
    
    for (const property of propertiesWithoutHighlighted) {
      if (property.images.length > 0) {
        // Marcar la primera imagen como destacada
        const firstImage = property.images[0];
        await prisma.image.update({
          where: { id: firstImage.id },
          data: { 
            isHighlighted: true,
            order: null 
          },
        });
        
        console.log(`⭐ Imagen destacada asignada: ${firstImage.id} para propiedad ${property.id}`);
      }
    }
    
    console.log('\n🎉 ¡Limpieza completada!');

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupOrphanedImages();
