const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixImageOrdering() {
  try {
    console.log('🔧 Corrigiendo ordenamiento de imágenes...');
    
    // Obtener todas las propiedades
    const properties = await prisma.property.findMany({
      include: {
        images: true,
      },
    });

    console.log(`📊 Procesando ${properties.length} propiedades`);
    
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
      
      if (images.length === 0) continue;
      
      // Separar imágenes destacadas de las de galería
      const highlightedImages = images.filter(img => img.isHighlighted);
      const galleryImages = images.filter(img => !img.isHighlighted);
      
      console.log(`⭐ Imágenes destacadas: ${highlightedImages.length}`);
      console.log(`🖼️ Imágenes de galería: ${galleryImages.length}`);
      
      // 1. Asegurar que solo haya una imagen destacada
      if (highlightedImages.length > 1) {
        console.log(`⚠️ Múltiples imágenes destacadas: ${highlightedImages.length}`);
        for (let i = 1; i < highlightedImages.length; i++) {
          await prisma.image.update({
            where: { id: highlightedImages[i].id },
            data: { 
              isHighlighted: false,
              order: null // Las imágenes destacadas no tienen orden
            },
          });
          console.log(`✅ Imagen ${highlightedImages[i].id} desmarcada como destacada`);
        }
      }
      
      // 2. Asignar orden secuencial solo a imágenes de galería
      if (galleryImages.length > 0) {
        console.log(`📊 Reordenando ${galleryImages.length} imágenes de galería`);
        
        // Ordenar por orden actual y asignar orden secuencial
        const sortedGalleryImages = galleryImages.sort((a, b) => 
          (a.order || 0) - (b.order || 0)
        );
        
        for (let i = 0; i < sortedGalleryImages.length; i++) {
          const newOrder = i + 1;
          await prisma.image.update({
            where: { id: sortedGalleryImages[i].id },
            data: { order: newOrder },
          });
          console.log(`✅ Imagen ${sortedGalleryImages[i].id} ordenada como ${newOrder}`);
        }
      }
      
      // 3. Asegurar que la imagen destacada no tenga orden
      if (highlightedImages.length > 0) {
        const highlightedImage = highlightedImages[0];
        if (highlightedImage.order !== null) {
          await prisma.image.update({
            where: { id: highlightedImage.id },
            data: { order: null },
          });
          console.log(`✅ Imagen destacada ${highlightedImage.id} sin orden`);
        }
      }
    }

    console.log('\n🎉 ¡Ordenamiento corregido exitosamente!');
    
    // Resumen final
    const totalImages = await prisma.image.count();
    const highlightedImages = await prisma.image.count({ where: { isHighlighted: true } });
    const galleryImages = await prisma.image.count({ 
      where: { 
        isHighlighted: false,
        order: { not: null }
      } 
    });
    
    console.log(`\n📊 Resumen final:`);
    console.log(`- Total de imágenes: ${totalImages}`);
    console.log(`- Imágenes destacadas: ${highlightedImages}`);
    console.log(`- Imágenes de galería: ${galleryImages}`);

  } catch (error) {
    console.error('❌ Error durante la corrección:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImageOrdering();
