import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { FeatureInput, Feature, UpdateFeatureInput } from '../../entities';
import { GridService } from '../grid/grid.service';
import { ImagesService } from '../images/images.service';
import { SliderService } from '../slider/slider.service';

@Injectable()
export class FeaturesService {
  private IMAGES_FOLDER = '/features';
  private include = {
    slider: {
      include: {
        slides: {
          include: {
            image: true,
          },
        },
      },
    },
    grid: {
      include: {
        slides: {
          include: {
            image: true,
          },
        },
      },
    },
    location: true,
    attachments: true,
    masterplan: true,
    highlightedImage: true,
    secondaryImage: true,
  };

  constructor(
    private prisma: PrismaService,
    private imagesService: ImagesService,
    private gridService: GridService,
    private sliderService: SliderService,
  ) {}

  async create({
    slider,
    grid,
    location,
    masterplan,
    attachments,
    highlightedImage,
    secondaryImage,
    highlightedItems,
    ...featureData
  }: FeatureInput): Promise<Feature> {
    let _highlightedImage;
    let _secondaryImage;
    let _grid;
    let _slider;

    if (grid)
      _grid = await this.gridService.create({
        ...grid,
        imageFolder: `${this.IMAGES_FOLDER}/grid`,
      });
    if (slider)
      _slider = await this.sliderService.create({
        ...slider,
        imageFolder: `${this.IMAGES_FOLDER}/slider`,
      });

    if (highlightedImage)
      _highlightedImage = await this.imagesService.create(
        highlightedImage,
        this.IMAGES_FOLDER,
      );
    if (secondaryImage)
      _secondaryImage = await this.imagesService.create(
        secondaryImage,
        this.IMAGES_FOLDER,
      );

    return await this.prisma.feature.create({
      data: {
        ...featureData,
        ...(highlightedItems && { highlightedItems }),
        ...(_slider && {
          slider: {
            connect: {
              id: _slider.id,
            },
          },
        }),
        ...(_grid && {
          grid: {
            connect: {
              id: _grid.id,
            },
          },
        }),
        ...(location && {
          location: {
            create: location,
          },
        }),
        ...(masterplan && {
          masterplan: {
            create: masterplan,
          },
        }),
        ...(attachments && {
          attachments: {
            create: attachments,
          },
        }),
        ...(_highlightedImage && {
          highlightedImage: {
            connect: { id: _highlightedImage.id },
          },
        }),
        ...(_secondaryImage && {
          secondaryImage: {
            connect: { id: _secondaryImage.id },
          },
        }),
        innerState: 'Publicado',
        code: `BB${Date.now().toString().slice(0, 6)}`,
      },
      include: this.include,
    });
  }

  async findAll(): Promise<Feature[]> {
    return await this.prisma.feature.findMany({
      include: this.include,
    });
  }

  async findOne(id: string): Promise<Feature | null> {
    return await this.prisma.feature.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async update(
    id: string,
    {
      slider,
      grid,
      location,
      masterplan,
      attachments,
      highlightedImage,
      secondaryImage,
      highlightedItems,
      oldHighlightedImage,
      oldSecondaryImage,
      ...featureData
    }: UpdateFeatureInput,
  ): Promise<Feature> {
    let _highlightedImage;
    let _secondaryImage;
    let _grid;
    let _slider;

    if (grid) {
      if (grid.id)
        await this.gridService.update(grid.id, {
          ...grid,
          imageFolder: `${this.IMAGES_FOLDER}/grid`,
        });
      else
        _grid = await this.gridService.create({
          ...grid,
          imageFolder: `${this.IMAGES_FOLDER}/grid`,
        });
    }
    if (slider) {
      if (slider.id) {
        await this.sliderService.update(slider.id, {
          ...slider,
          imageFolder: `${this.IMAGES_FOLDER}/slider`,
        });
      } else
        _slider = await this.sliderService.create({
          ...slider,
          imageFolder: `${this.IMAGES_FOLDER}/slider`,
        });
    }

    if (highlightedImage)
      _highlightedImage = await this.imagesService.create(
        highlightedImage,
        this.IMAGES_FOLDER,
      );
    if (secondaryImage)
      _secondaryImage = await this.imagesService.create(
        secondaryImage,
        this.IMAGES_FOLDER,
      );
    if (oldSecondaryImage?.publicId)
      await this.imagesService.delete(oldSecondaryImage.publicId);
    if (oldHighlightedImage?.publicId)
      await this.imagesService.delete(oldHighlightedImage.publicId);

    return await this.prisma.feature.update({
      where: {
        id,
      },
      data: {
        ...featureData,
        ...(highlightedItems && { highlightedItems }),
        ...(_slider && {
          slider: {
            connect: {
              id: _slider.id,
            },
          },
        }),
        ...(_grid && {
          grid: {
            connect: {
              id: _grid.id,
            },
          },
        }),
        ...(location && {
          location: {
            update: location,
          },
        }),
        ...(masterplan && {
          masterplan: {
            update: masterplan,
          },
        }),
        ...(attachments && {
          attachments: {
            updateMany: attachments.map(({ id, ...attachment }) => ({
              where: { id },
              data: attachment,
            })),
          },
        }),
        ...(_highlightedImage && {
          highlightedImage: {
            connect: { id: _highlightedImage.id },
          },
        }),
        ...(_secondaryImage && {
          secondaryImage: {
            connect: { id: _secondaryImage.id },
          },
        }),
        innerState: 'Publicado',
        code: `BB${Date.now().toString().slice(0, 6)}`,
      },
      include: this.include,
    });
  }

  async delete(id: string): Promise<Feature> {
    let deletedSlider;
    let deletedGrid;

    await this.prisma.masterplan.deleteMany({
      where: { featureId: id },
    });
    const deletedFeature = await this.prisma.feature.delete({
      where: { id },
      include: this.include,
    });

    if (deletedFeature.highlightedImage)
      await this.imagesService.delete(deletedFeature.highlightedImage.publicId);
    if (deletedFeature.secondaryImage)
      await this.imagesService.delete(deletedFeature.secondaryImage.publicId);
    if (deletedFeature.slider)
      deletedSlider = await this.sliderService.delete(deletedFeature.slider.id);
    if (deletedFeature.grid)
      deletedGrid = await this.gridService.delete(deletedFeature.grid.id);
    if (deletedSlider?.slides)
      for (let i = 0; i < deletedSlider.slides.length; i++) {
        const image = deletedSlider.slides[i].image;
        if (image) await this.imagesService.delete(image.publicId);
      }
    if (deletedGrid?.slides)
      for (let i = 0; i < deletedGrid.slides.length; i++) {
        const image = deletedGrid.slides[i].image;
        if (image) await this.imagesService.delete(image.publicId);
      }

    return deletedFeature;
  }
}
