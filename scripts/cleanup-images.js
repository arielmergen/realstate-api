const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupImages() {
  try {
    console.log('🧹 Iniciando limpieza de datos de imágenes...');
    
    // 1. Obtener todas las propiedades
    const properties = await prisma.property.findMany({
      select: { id: true, title: true }
    });
    
    console.log(`📊 Encontradas ${properties.length} propiedades`);
    
    for (const property of properties) {
      console.log(`\n🔍 Procesando propiedad: ${property.title} (${property.id})`);
      
      // 2. Obtener imágenes de la propiedad
      const images = await prisma.image.findMany({
        where: {
          properties: {
            some: {
              id: property.id,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      });
      
      console.log(`📸 Imágenes encontradas: ${images.length}`);
      
      if (images.length === 0) continue;
      
      // 3. Corregir múltiples imágenes destacadas
      const highlightedImages = images.filter(img => img.isHighlighted);
      if (highlightedImages.length > 1) {
        console.log(`⚠️  Múltiples imágenes destacadas: ${highlightedImages.length}`);
        
        // Mantener solo la primera como destacada
        for (let i = 1; i < highlightedImages.length; i++) {
          await prisma.image.update({
            where: { id: highlightedImages[i].id },
            data: { isHighlighted: false },
          });
          console.log(`✅ Imagen ${highlightedImages[i].id} desmarcada como destacada`);
        }
      }
      
      // 4. Corregir orden secuencial
      const imagesWithOrder = images.filter(img => img.order !== null);
      if (imagesWithOrder.length > 0) {
        console.log(`📊 Corrigiendo orden de ${imagesWithOrder.length} imágenes`);
        
        // Ordenar por orden actual y asignar orden secuencial
        const sortedImages = imagesWithOrder.sort((a, b) => 
          (a.order || 0) - (b.order || 0)
        );
        
        for (let i = 0; i < sortedImages.length; i++) {
          const newOrder = i + 1;
          if (sortedImages[i].order !== newOrder) {
            await prisma.image.update({
              where: { id: sortedImages[i].id },
              data: { order: newOrder },
            });
            console.log(`✅ Imagen ${sortedImages[i].id} ordenada como ${newOrder}`);
          }
        }
      }
      
      // 5. Asignar orden a imágenes sin orden
      const imagesWithoutOrder = images.filter(img => img.order === null);
      if (imagesWithoutOrder.length > 0) {
        console.log(`📊 Asignando orden a ${imagesWithoutOrder.length} imágenes sin orden`);
        
        const maxOrder = Math.max(...imagesWithOrder.map(img => img.order || 0), 0);
        
        for (let i = 0; i < imagesWithoutOrder.length; i++) {
          const newOrder = maxOrder + i + 1;
          await prisma.image.update({
            where: { id: imagesWithoutOrder[i].id },
            data: { order: newOrder },
          });
          console.log(`✅ Imagen ${imagesWithoutOrder[i].id} ordenada como ${newOrder}`);
        }
      }
    }
    
    console.log('\n🎉 ¡Limpieza completada exitosamente!');
    
    // 6. Mostrar resumen final
    const totalImages = await prisma.image.count();
    const highlightedImages = await prisma.image.count({
      where: { isHighlighted: true }
    });
    
    console.log(`\n📊 Resumen final:`);
    console.log(`- Total de imágenes: ${totalImages}`);
    console.log(`- Imágenes destacadas: ${highlightedImages}`);
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupImages();
