const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupOrphanedReferences() {
  try {
    console.log('🧹 Limpiando referencias huérfanas de imágenes destacadas...');
    
    // Obtener todas las propiedades
    const properties = await prisma.property.findMany({
      include: {
        images: true,
      },
    });
    
    console.log(`📊 Encontradas ${properties.length} propiedades`);
    
    let cleanedCount = 0;
    
    for (const property of properties) {
      console.log(`\n🔍 Procesando propiedad: ${property.title} (${property.id})`);
      
      // Obtener imágenes de la propiedad
      const images = await prisma.image.findMany({
        where: {
          properties: {
            some: {
              id: property.id,
            },
          },
        },
      });
      
      console.log(`📸 Imágenes encontradas: ${images.length}`);
      
      if (images.length === 0) {
        console.log(`⚠️ Propiedad sin imágenes - saltando`);
        continue;
      }
      
      // Verificar si hay imagen destacada
      const highlightedImages = images.filter(img => img.isHighlighted);
      
      if (highlightedImages.length === 0) {
        console.log(`⭐ No hay imagen destacada - asignando la primera`);
        
        // Marcar la primera imagen como destacada
        const firstImage = images[0];
        await prisma.image.update({
          where: { id: firstImage.id },
          data: { 
            isHighlighted: true,
            order: null 
          },
        });
        
        console.log(`✅ Imagen destacada asignada: ${firstImage.id}`);
        cleanedCount++;
      } else if (highlightedImages.length > 1) {
        console.log(`⚠️ Múltiples imágenes destacadas: ${highlightedImages.length}`);
        
        // Desmarcar todas excepto la primera
        for (let i = 1; i < highlightedImages.length; i++) {
          await prisma.image.update({
            where: { id: highlightedImages[i].id },
            data: { 
              isHighlighted: false,
              order: null 
            },
          });
          
          console.log(`✅ Imagen desmarcada: ${highlightedImages[i].id}`);
        }
        cleanedCount++;
      } else {
        console.log(`✅ Imagen destacada correcta: ${highlightedImages[0].id}`);
      }
      
      // Verificar orden de galería
      const galleryImages = images.filter(img => !img.isHighlighted);
      if (galleryImages.length > 0) {
        console.log(`🖼️ Verificando orden de galería: ${galleryImages.length} imágenes`);
        
        // Ordenar por orden actual y asignar orden secuencial
        const sortedGalleryImages = galleryImages.sort((a, b) => 
          (a.order || 0) - (b.order || 0)
        );
        
        for (let i = 0; i < sortedGalleryImages.length; i++) {
          const newOrder = i + 1;
          if (sortedGalleryImages[i].order !== newOrder) {
            await prisma.image.update({
              where: { id: sortedGalleryImages[i].id },
              data: { order: newOrder },
            });
            console.log(`✅ Imagen ordenada: ${sortedGalleryImages[i].id} -> ${newOrder}`);
          }
        }
      }
    }
    
    console.log(`\n📊 Resumen de limpieza:`);
    console.log(`- Referencias corregidas: ${cleanedCount}`);
    console.log(`- Total propiedades procesadas: ${properties.length}`);
    
    console.log('\n🎉 ¡Limpieza de referencias completada!');

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupOrphanedReferences();
