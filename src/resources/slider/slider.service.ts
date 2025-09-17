import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { SliderInput, Slider, UpdateSliderInput } from '../../entities';
import { ImagesService } from '../images/images.service';

@Injectable()
export class SliderService {
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
  }: SliderInput & { imageFolder?: string }): Promise<Slider> {
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

    return await this.prisma.sliderConfiguration.create({
      data: {
        slides: {
          create: resolvedFormattedSlides,
        },
      },
      include: this.include,
    });
  }

  async findAll(): Promise<Slider[]> {
    return await this.prisma.sliderConfiguration.findMany({
      include: this.include,
    });
  }

  async findOne(id: string): Promise<Slider | null> {
    return await this.prisma.sliderConfiguration.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async update(
    id: string,
    { slides, imageFolder }: UpdateSliderInput & { imageFolder?: string },
  ): Promise<Slider> {
    const slidesToDelete = await this.prisma.slide.findMany({
      where: { sliderConfigurationId: id },
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

    return await this.prisma.sliderConfiguration.update({
      where: {
        id,
      },
      data: {
        slides: {
          create: resolvedFormattedSlides,
        },
      },
      include: this.include,
    });
  }

  async delete(id: string): Promise<Slider> {
    const slides = await this.prisma.slide.findMany({
      where: { sliderConfigurationId: id },
    });
    for (let i = 0; slides.length < i; i++) {
      const slide = slides[i];
      if (slide.imageId) await this.imagesService.delete(slide.imageId);
    }

    return await this.prisma.sliderConfiguration.delete({
      where: { id },
      include: this.include,
    });
  }
}
