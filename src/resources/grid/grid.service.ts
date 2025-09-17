import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { GridInput, UpdateGridInput, Grid } from '../../entities';
import { ImagesService } from '../images/images.service';

@Injectable()
export class GridService {
  private include = {
    slides: {
      include: {
        image: true,
      },
    },
  };

  constructor(
    private prisma: PrismaService,
    private imagesService: ImagesService,
  ) {}

  async create({
    slides,
    imageFolder,
    ...grid
  }: GridInput & { imageFolder?: string }): Promise<Grid> {
    const formattedSlides = slides?.map(async ({ image, ...slide }) => ({
      ...slide,
      ...(image && {
        image: {
          connect: {
            id: (await this.imagesService.create(image, imageFolder)).id,
          },
        },
      }),
    }));
    const resolvedFormattedSlides = formattedSlides
      ? await Promise.all(formattedSlides)
      : [];

    return await this.prisma.gridConfiguration.create({
      data: {
        ...grid,
        slides: {
          create: resolvedFormattedSlides,
        },
      },
      include: this.include,
    });
  }

  async findAll(): Promise<Grid[]> {
    return await this.prisma.gridConfiguration.findMany({
      include: this.include,
    });
  }

  async findOne(id: string): Promise<Grid | null> {
    return await this.prisma.gridConfiguration.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async update(
    id: string,
    {
      slides,
      id: _,
      imageFolder,
      ...grid
    }: UpdateGridInput & { imageFolder?: string },
  ): Promise<Grid> {
    const slidesToDelete = await this.prisma.slide.findMany({
      where: { gridConfigurationId: id },
      include: { image: true },
    });
    if (slidesToDelete.length)
      for (let i = 0; i < slidesToDelete.length; i++) {
        const imageToDelete = slidesToDelete[i].image;
        if (imageToDelete?.publicId)
          await this.imagesService.delete(imageToDelete.publicId);
      }

    const formattedSlides = slides?.map(async ({ image, ...slide }) => ({
      ...slide,
      ...(image && {
        image: {
          connect: {
            id: (await this.imagesService.create(image, imageFolder)).id,
          },
        },
      }),
    }));
    const resolvedFormattedSlides = formattedSlides
      ? await Promise.all(formattedSlides)
      : [];

    return await this.prisma.gridConfiguration.update({
      where: {
        id,
      },
      data: {
        ...grid,
        slides: {
          create: resolvedFormattedSlides,
        },
      },
      include: this.include,
    });
  }

  async delete(id: string): Promise<Grid> {
    const slides = await this.prisma.slide.findMany({
      where: { gridConfigurationId: id },
    });
    for (let i = 0; slides.length < i; i++) {
      const slide = slides[i];
      if (slide.imageId) await this.imagesService.delete(slide.imageId);
    }

    return await this.prisma.gridConfiguration.delete({
      where: { id },
      include: this.include,
    });
  }
}
