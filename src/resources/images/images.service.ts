import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import {
  CreateImageInput,
  Image,
  CreateMultipleImagesInput,
  ReorderImagesInput,
} from '../../entities';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    { base64Image, propertyId, ...createImageInput }: CreateImageInput,
    folder?: string,
  ): Promise<Image> {
    const _image = await this.cloudinary.create(base64Image, folder);
    
    const imageData: any = {
      ...createImageInput,
      publicId: _image.public_id,
      src: _image.secure_url,
    };

    // Si hay propertyId, conectar con la propiedad
    if (propertyId) {
      // VALIDACIÓN: Si es imagen destacada, desmarcar otras destacadas de la misma propiedad
      if (createImageInput.isHighlighted) {
        await this.unhighlightOtherImages(propertyId);
        // Las imágenes destacadas NO tienen orden
        imageData.order = null;
      } else {
        // VALIDACIÓN: Asignar orden secuencial solo para imágenes NO destacadas
        if (!createImageInput.order) {
          const nextOrder = await this.getNextOrderForProperty(propertyId);
          imageData.order = nextOrder;
        }
      }
      
      imageData.properties = {
        connect: { id: propertyId }
      };
    }

    const { highlightedImageId, secondaryImageId, ...image } = await this.prisma.image.create({
      data: imageData,
    });

    return image;
  }

  async findAll(): Promise<Image[]> {
    return await this.prisma.image.findMany();
  }

  async findOne(id: string): Promise<Image | null> {
    return await this.prisma.image.findUnique({ where: { id } });
  }

  async delete(publicId: string): Promise<Image> {
    try {
      // Intentar eliminar de Cloudinary (no crítico si falla)
      const cloudinaryResult = await this.cloudinary.delete(publicId);
      
      if (cloudinaryResult.result === 'error') {
        console.warn(
          `⚠️ No se pudo eliminar imagen de Cloudinary: ${publicId}`,
        );
      }
    } catch (error) {
      console.warn(
        `⚠️ Error al eliminar imagen de Cloudinary: ${error.message}`,
      );
    }

    // Siempre eliminar de la base de datos
    return await this.prisma.image.delete({ where: { publicId } });
  }

  async createMultiple(
    { images, propertyId }: CreateMultipleImagesInput,
    folder?: string,
  ): Promise<Image[]> {
    const createdImages: Image[] = [];

    for (const imageInput of images) {
      const image = await this.create(
        { ...imageInput, propertyId },
        folder || '/properties',
      );
      createdImages.push(image);
    }

    return createdImages;
  }

  async reorderImages({ images }: ReorderImagesInput): Promise<Image[]> {
    const updatedImages: Image[] = [];

    // Obtener información de las imágenes para validar
    const imageIds = images.map((img) => img.imageId);
    const existingImages = await this.prisma.image.findMany({
      where: { id: { in: imageIds } },
      select: { id: true, isHighlighted: true },
    });

    // Validar que no haya órdenes duplicados
    const orders = images.map((img) => img.order);
    const uniqueOrders = new Set(orders);
    if (orders.length !== uniqueOrders.size) {
      throw new Error('No se pueden tener órdenes duplicados');
    }

    // VALIDACIÓN: Verificar que ninguna imagen sea destacada
    const highlightedImages = existingImages.filter((img) => img.isHighlighted);
    if (highlightedImages.length > 0) {
      throw new Error(
        'No se puede reordenar imágenes destacadas. Use el método específico para cambiar la imagen destacada.',
      );
    }

    // Actualizar imágenes con transacción
    for (const { imageId, order } of images) {
      const updatedImage = await this.prisma.image.update({
        where: { id: imageId },
        data: { order },
      });
      updatedImages.push(updatedImage);
    }

    return updatedImages;
  }

  async findByProperty(propertyId: string): Promise<Image[]> {
    return await this.prisma.image.findMany({
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
  }

  async updateOrder(imageId: string, order: number): Promise<Image> {
    // Verificar que la imagen no sea destacada
    const image = await this.prisma.image.findUnique({
      where: { id: imageId },
      select: { isHighlighted: true }
    });

    if (image?.isHighlighted) {
      throw new Error(
        'No se puede actualizar el orden de una imagen destacada',
      );
    }

    return await this.prisma.image.update({
      where: { id: imageId },
      data: { order },
    });
  }

  async connectToProperty(imageId: string, propertyId: string): Promise<Image> {
    return await this.prisma.image.update({
      where: { id: imageId },
      data: {
        properties: {
          connect: { id: propertyId },
        },
      },
      include: {
        properties: true,
      },
    });
  }

  async setHighlightedImage(
    imageId: string,
    propertyId: string,
  ): Promise<Image> {
    // 1. Desmarcar todas las imágenes destacadas de la propiedad (sin eliminar)
    await this.unhighlightExistingHighlightedImages(propertyId);

    // 2. Marcar la nueva imagen como destacada y quitarle el orden
    const updatedImage = await this.prisma.image.update({
      where: { id: imageId },
      data: {
        isHighlighted: true,
        order: null, // Las imágenes destacadas no tienen orden
      },
    });

    return updatedImage;
  }

  async cleanupOrphanedImages(propertyId: string): Promise<boolean> {
    try {
      // Obtener imágenes de la propiedad
      const images = await this.prisma.image.findMany({
        where: {
          properties: {
            some: {
              id: propertyId,
            },
          },
        },
      });
      
      if (images.length === 0) {
        return false;
      }
      
      // Verificar si hay imagen destacada
      const highlightedImages = images.filter((img) => img.isHighlighted);

      if (highlightedImages.length === 0) {
        // Marcar la primera imagen como destacada
        const firstImage = images[0];
        await this.prisma.image.update({
          where: { id: firstImage.id },
          data: {
            isHighlighted: true,
            order: null,
          },
        });
      } else if (highlightedImages.length > 1) {
        // Desmarcar todas excepto la primera
        for (let i = 1; i < highlightedImages.length; i++) {
          await this.prisma.image.update({
            where: { id: highlightedImages[i].id },
            data: {
              isHighlighted: false,
              order: null,
            },
          });
        }
      }
      
      // Verificar orden de galería
      const galleryImages = images.filter((img) => !img.isHighlighted);
      if (galleryImages.length > 0) {
        const sortedGalleryImages = galleryImages.sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );

        for (let i = 0; i < sortedGalleryImages.length; i++) {
          const newOrder = i + 1;
          if (sortedGalleryImages[i].order !== newOrder) {
            await this.prisma.image.update({
              where: { id: sortedGalleryImages[i].id },
              data: { order: newOrder },
            });
          }
        }
      }

      return true;
    } catch (error) {
      console.error('❌ Error durante la limpieza:', error);
      return false;
    }
  }

  private async unhighlightOtherImages(propertyId: string): Promise<void> {
    // Obtener las imágenes destacadas que se van a eliminar
    const highlightedImages = await this.prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
        isHighlighted: true,
      },
    });
    
    // Eliminar las imágenes destacadas anteriores (no mover a galería)
    for (const image of highlightedImages) {
      try {
        // Eliminar de Cloudinary
        await this.cloudinary.delete(image.publicId);
      } catch (error) {
        console.warn(
          `⚠️ Error al eliminar imagen de Cloudinary: ${error.message}`,
        );
      }
      
      // Eliminar de la base de datos
      await this.prisma.image.delete({
        where: { id: image.id },
      });
    }
  }

  private async unhighlightExistingHighlightedImages(
    propertyId: string,
  ): Promise<void> {
    // Obtener las imágenes destacadas que se van a desmarcar
    const highlightedImages = await this.prisma.image.findMany({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
        isHighlighted: true,
      },
    });
    
    // Desmarcar las imágenes destacadas y asignarles orden en la galería
    for (const image of highlightedImages) {
      const nextOrder = await this.getNextOrderForProperty(propertyId);
      await this.prisma.image.update({
        where: { id: image.id },
        data: {
          isHighlighted: false,
          order: nextOrder,
        },
      });
    }
  }

  private async getNextOrderForProperty(propertyId: string): Promise<number> {
    // Solo contar imágenes NO destacadas para el ordenamiento
    const lastImage = await this.prisma.image.findFirst({
      where: {
        properties: {
          some: {
            id: propertyId,
          },
        },
        isHighlighted: false, // Excluir imágenes destacadas del ordenamiento
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    return (lastImage?.order || 0) + 1;
  }
}
