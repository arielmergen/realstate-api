import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateImageInput, Image } from '../../entities';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    { base64Image, ...createImageInput }: CreateImageInput,
    folder?: string,
  ): Promise<Image> {
    const _image = await this.cloudinary.create(base64Image, folder);
    const {
      highlightedImageId: _1,
      secondaryImageId: _2,
      ...image
    } = await this.prisma.image.create({
      data: {
        ...createImageInput,
        publicId: _image.public_id,
        src: _image.secure_url,
      },
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
}
