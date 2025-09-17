import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import {
  HomeConfigurationInput,
  HomeConfiguration,
  UpdateHomeConfigurationInput,
} from '../../entities';
import { GridService } from '../grid/grid.service';
import { SliderService } from '../slider/slider.service';

@Injectable()
export class HomeConfigurationService {
  private IMAGES_FOLDER = '/home-configuration';
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
  };

  constructor(
    private prisma: PrismaService,
    private gridService: GridService,
    private sliderService: SliderService,
  ) {}

  async create({
    grid,
    slider,
  }: HomeConfigurationInput): Promise<HomeConfiguration> {
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

    return await this.prisma.homeConfiguration.create({
      data: {
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
      },
      include: this.include,
    });
  }

  async findAll(): Promise<HomeConfiguration[]> {
    return await this.prisma.homeConfiguration.findMany({
      include: this.include,
    });
  }

  async findOne(id: string): Promise<HomeConfiguration | null> {
    return await this.prisma.homeConfiguration.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async update(
    id: string,
    { slider, grid }: UpdateHomeConfigurationInput = {},
  ): Promise<HomeConfiguration | null> {
    let _slider;
    let _grid;

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

    if (_slider || _grid)
      return await this.prisma.homeConfiguration.update({
        where: { id },
        data: {
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
        },
      });

    return await this.findOne(id);
  }

  async delete(id: string) {
    return await this.prisma.homeConfiguration.delete({
      where: { id },
      include: this.include,
    });
  }
}
