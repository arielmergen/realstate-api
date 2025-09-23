# 📋 **Guía de Ordenamiento de Imágenes para Frontend**

## **🎯 Queries Disponibles con Ordenamiento Correcto**

### **1. Query `property` (Recomendada)**
```graphql
query GetProperty($id: ID!) {
  property(id: $id) {
    id
    title
    images {
      id
      src
      order
      isHighlighted
      alt
    }
  }
}
```

### **2. Query `propertyWithOrderedImages` (Garantizada)**
```graphql
query GetPropertyWithOrderedImages($id: ID!) {
  propertyWithOrderedImages(id: $id) {
    id
    title
    images {
      id
      src
      order
      isHighlighted
      alt
    }
  }
}
```

### **3. Query `imagesByProperty` (Solo imágenes)**
```graphql
query GetImagesByProperty($propertyId: ID!) {
  imagesByProperty(propertyId: $propertyId) {
    id
    src
    order
    isHighlighted
    alt
  }
}
```

## **📊 Estructura de Respuesta Ordenada**

### **Orden Correcto:**
1. **Imagen destacada** (`isHighlighted: true`, `order: null`)
2. **Galería ordenada** (`isHighlighted: false`, `order: 1, 2, 3...`)

### **Ejemplo de Respuesta:**
```json
{
  "data": {
    "property": {
      "id": "e0028ce4-6d68-43cb-83fb-61c20703624b",
      "title": "Casa Hermosa",
      "images": [
        {
          "id": "4a09ce6d-1148-4ad0-8e1a-72810616ae2e",
          "src": "https://res.cloudinary.com/...",
          "order": null,
          "isHighlighted": true,
          "alt": "3.jpeg"
        },
        {
          "id": "834f30cc-4326-40c1-a08d-9e71c7587b6e",
          "src": "https://res.cloudinary.com/...",
          "order": 1,
          "isHighlighted": false,
          "alt": "2.jpeg"
        },
        {
          "id": "bdf94ea7-fd90-44a0-8665-8f114c219bee",
          "src": "https://res.cloudinary.com/...",
          "order": 2,
          "isHighlighted": false,
          "alt": "1.jpeg"
        },
        {
          "id": "a7c63a20-f629-4451-8e47-ae606b69e07d",
          "src": "https://res.cloudinary.com/...",
          "order": 3,
          "isHighlighted": false,
          "alt": "3.jpeg"
        }
      ]
    }
  }
}
```

## **🔄 Mutaciones para Reordenamiento**

### **1. Reordenar Galería (Solo imágenes NO destacadas)**
```graphql
mutation ReorderImages($reorderInput: ReorderImagesInput!) {
  reorderImages(reorderInput: $reorderInput) {
    id
    order
    isHighlighted
  }
}
```

**Input:**
```json
{
  "reorderInput": {
    "images": [
      { "imageId": "id1", "order": 1 },
      { "imageId": "id2", "order": 2 },
      { "imageId": "id3", "order": 3 }
    ]
  }
}
```

### **2. Cambiar Imagen Destacada**
```graphql
mutation SetHighlightedImage($imageId: ID!, $propertyId: ID!) {
  setHighlightedImage(imageId: $imageId, propertyId: $propertyId) {
    id
    isHighlighted
    order
  }
}
```

## **⚠️ Validaciones del Backend**

- **✅ Solo 1 imagen destacada** por propiedad
- **✅ Imagen destacada NO se reordena** (orden fijo `null`)
- **✅ Galería se reordena** secuencialmente (1, 2, 3, 4...)
- **✅ Validaciones** previenen errores de ordenamiento

## **🎯 Recomendaciones para el Frontend**

### **1. Usar Query `property`**
- **Ventaja:** Incluye todos los datos de la propiedad
- **Ordenamiento:** Garantizado por el backend
- **Uso:** Para páginas de detalle de propiedad

### **2. Usar Query `imagesByProperty`**
- **Ventaja:** Solo imágenes, más ligera
- **Ordenamiento:** Garantizado por el backend
- **Uso:** Para componentes de galería

### **3. Usar Query `propertyWithOrderedImages`**
- **Ventaja:** Garantía explícita de ordenamiento
- **Ordenamiento:** Explícitamente definido
- **Uso:** Si hay problemas con la query `property`

## **🔧 Solución de Problemas**

### **Si no ves el orden correcto:**

1. **Verificar query:** Usar `property` o `propertyWithOrderedImages`
2. **Limpiar cache:** El frontend puede estar cacheando resultados
3. **Verificar autenticación:** Las mutaciones requieren JWT
4. **Verificar backend:** Asegurar que el servidor esté actualizado

### **Para Debugging:**
```graphql
query DebugImages($id: ID!) {
  property(id: $id) {
    images {
      id
      order
      isHighlighted
    }
  }
}
```

## **📱 Implementación Frontend**

### **Estructura de Datos:**
```typescript
interface PropertyImage {
  id: string;
  src: string;
  order: number | null;
  isHighlighted: boolean;
  alt: string;
}

interface Property {
  id: string;
  title: string;
  images: PropertyImage[];
}
```

### **Lógica de Ordenamiento:**
```typescript
// Las imágenes ya vienen ordenadas del backend
const orderedImages = property.images;

// Separar imagen destacada de galería
const highlightedImage = orderedImages.find(img => img.isHighlighted);
const galleryImages = orderedImages.filter(img => !img.isHighlighted);

// Mostrar: destacada + galería ordenada
const displayImages = [highlightedImage, ...galleryImages].filter(Boolean);
```

**¡El backend está 100% listo y garantiza el ordenamiento correcto!** 🚀
