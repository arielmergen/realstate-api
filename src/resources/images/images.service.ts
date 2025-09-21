import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateImageInput, Image, CreateMultipleImagesInput, ReorderImagesInput } from '../../entities';
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
      imageData.properties = {
        connect: { id: propertyId }
      };
    }

    const {
      highlightedImageId: _1,
      secondaryImageId: _2,
      ...image
    } = await this.prisma.image.create({
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
    await this.cloudinary.delete(publicId).catch((err) => {
      console.error(err);
    });

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
        folder || '/properties'
      );
      createdImages.push(image);
    }

    return createdImages;
  }

  async reorderImages({ images }: ReorderImagesInput): Promise<Image[]> {
    const updatedImages: Image[] = [];

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
      orderBy: {
        order: 'asc',
      },
    });
  }

  async updateOrder(imageId: string, order: number): Promise<Image> {
    return await this.prisma.image.update({
      where: { id: imageId },
      data: { order },
    });
  }
}
