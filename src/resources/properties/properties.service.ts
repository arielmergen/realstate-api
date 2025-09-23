import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import {
  PropertyFiltersInput,
  PropertyInput,
  PropertyResponse,
  State,
  Property,
  Image,
} from '../../entities';
import { ImagesService } from '../images/images.service';

@Injectable()
export class PropertiesService {
  private include = {
    amenities: true,
    services: true,
    images: {
      orderBy: [
        {
          isHighlighted: 'desc' as const, // Imágenes destacadas primero
        },
        {
          order: 'asc' as const, // Luego por orden
        },
      ],
    },
    type: true,
    geoCity: true,
    geoZone: true,
    geoLocation: true,
    owner: true,
    createdBy: {
      include: {
        role: true,
      },
    },
  };

  constructor(
    private prisma: PrismaService,
    private imagesService: ImagesService,
  ) {}

  async create({
    geoZone,
    geoCity,
    geoLocation,
    type,
    amenities,
    services,
    images,
    attachments,
    owner,
    createdByEmail,
    videos,
    ...propertyData
  }: PropertyInput): Promise<Property> {
    let _images: Image[] = [];
    if (images?.length)
      for (let i = 0; images.length > i; i++) {
        const image = images[i];
        if (image) {
          _images = [
            ..._images,
            await this.imagesService.create(image, '/properties'),
          ];
        }
      }

    const createdProperty = await this.prisma.property.create({
      data: {
        ...propertyData,
        videos: videos || [],
        createdBy: {
          connect: {
            email: createdByEmail,
          },
        },
        attachments: attachments || [],
        geoZone: {
          connect: {
            id: geoZone,
          },
        },
        ...(owner && {
          owner: {
            connect: {
              id: owner,
            },
          },
        }),
        ...(geoCity && {
          geoCity: {
            connect: {
              id: geoCity,
            },
          },
        }),
        geoLocation: {
          connect: {
            id: geoLocation,
          },
        },
        ...(type && {
          type: {
            connect: {
              id: type,
            },
          },
        }),
        ...(amenities?.length && {
          amenities: {
            connect: amenities.map((id) => ({
              id: id,
            })),
          },
        }),
        ...(services?.length && {
          services: {
            connect: services.map((id) => ({
              id: id,
            })),
          },
        }),
        ...(_images?.length && {
          images: {
            connect: _images.map(({ id }) => ({
              id: id,
            })),
          },
        }),
        innerState: 'Publicado',
        code: `AA${Date.now().toString().slice(6)}`,
      },
      include: this.include,
    });
    const {
      createdBy: { password: _, pictureId: _3, refreshToken: _4, ...createdBy },
      ...cuttedCreatedProperty
    } = createdProperty;

    return { ...cuttedCreatedProperty, createdBy };
  }

  async findAll(
    {
      amenities,
      antiquity,
      antiquityFrom,
      backyardSquareSpaceFrom,
      backyardSquareSpaceTo,
      bedroomsAmountFrom,
      bedroomsAmountTo,
      currency,
      disposal,
      features,
      frontSquareSpaceFrom,
      frontSquareSpaceTo,
      geoCity,
      geoLocation,
      geoZone,
      innerSquareSpaceFrom,
      innerSquareSpaceTo,
      operation,
      orientation,
      outterSquareSpaceFrom,
      outterSquareSpaceTo,
      priceFrom,
      priceTo,
      semiInnerSquareSpaceFrom,
      semiInnerSquareSpaceTo,
      services,
      spacesNumberFrom,
      spacesNumberTo,
      tipology,
      totalBuiltSquareSpaceFrom,
      totalBuiltSquareSpaceTo,
      totalSquareSpaceFrom,
      totalSquareSpaceTo,
      type,
      ...filters
    }: PropertyFiltersInput = {},
    first: number,
    after: string,
  ): Promise<PropertyResponse> {
    const where = {
      ...filters,
      ...(currency && { currency }),
      ...(operation && { operation }),
      ...(disposal && { disposal: { in: disposal } }),
      ...(orientation && { orientation: { in: orientation } }),
      ...(!!type?.length && {
        type: { is: { id: { in: type.map((id) => id!) } } },
      }),
      ...(geoZone && { geoZone: { id: geoZone } }),
      ...(geoLocation && { geoLocation: { id: geoLocation } }),
      ...(!!geoCity?.length && {
        geoCity: { is: { id: { in: geoCity.map((id) => id!) } } },
      }),
      ...(!!amenities?.length && {
        amenities: { some: { id: { in: amenities.map((id) => id!) } } },
      }),
      ...(!!services?.length && {
        services: { some: { id: { in: services.map((id) => id!) } } },
      }),
      ...(features?.services?.length &&
        features?.amenities?.length && {
          AND: [
            {
              services: {
                some: {
                  id: { in: features.services.map((id) => id!) },
                },
              },
            },
            {
              amenities: {
                some: {
                  id: { in: features.amenities.map((id) => id!) },
                },
              },
            },
          ],
        }),
      ...(antiquity &&
        antiquityFrom && {
          antiquity: { in: antiquity },
        }),
      ...(antiquityFrom &&
        !antiquity && {
          antiquity: {
            gte: antiquityFrom,
          },
        }),
      ...(antiquityFrom &&
        antiquity && {
          AND: [
            {
              antiquity: {
                gte: antiquityFrom,
              },
            },
            {
              antiquity: { in: antiquity },
            },
          ],
        }),
      ...(priceFrom &&
        !priceTo && {
          price: {
            gte: priceFrom,
          },
        }),
      ...(priceTo &&
        !priceFrom && {
          price: {
            lte: priceTo,
          },
        }),
      ...(priceTo &&
        priceFrom && {
          AND: [
            {
              price: { lte: priceTo },
            },
            {
              price: {
                gte: priceFrom,
              },
            },
          ],
        }),
      ...(spacesNumberFrom &&
        !spacesNumberTo && {
          spacesNumber: {
            gte: spacesNumberFrom,
          },
        }),
      ...(spacesNumberTo &&
        !spacesNumberFrom && {
          spacesNumber: {
            lte: spacesNumberTo,
          },
        }),
      ...(spacesNumberFrom &&
        spacesNumberTo && {
          AND: [
            {
              spacesNumber: {
                lte: spacesNumberTo,
              },
            },
            {
              spacesNumber: {
                gte: spacesNumberFrom,
              },
            },
          ],
        }),
      ...(bedroomsAmountFrom &&
        !bedroomsAmountTo && {
          bedroomsAmount: {
            gte: bedroomsAmountFrom,
          },
        }),
      ...(bedroomsAmountTo &&
        !bedroomsAmountFrom && {
          bedroomsAmount: {
            lte: bedroomsAmountTo,
          },
        }),
      ...(bedroomsAmountFrom &&
        bedroomsAmountTo && {
          AND: [
            {
              bedroomsAmount: {
                lte: bedroomsAmountTo,
              },
            },
            {
              bedroomsAmount: {
                gte: bedroomsAmountFrom,
              },
            },
          ],
        }),
      ...(frontSquareSpaceFrom &&
        !frontSquareSpaceTo && {
          frontSquareSpace: {
            gte: frontSquareSpaceFrom,
          },
        }),
      ...(frontSquareSpaceTo &&
        !frontSquareSpaceFrom && {
          frontSquareSpace: {
            lte: frontSquareSpaceTo,
          },
        }),
      ...(frontSquareSpaceFrom &&
        frontSquareSpaceTo && {
          AND: [
            {
              frontSquareSpace: {
                lte: frontSquareSpaceTo,
              },
            },
            {
              frontSquareSpace: {
                gte: frontSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(backyardSquareSpaceFrom &&
        !backyardSquareSpaceTo && {
          backyardSquareSpace: {
            gte: backyardSquareSpaceFrom,
          },
        }),
      ...(backyardSquareSpaceTo &&
        !backyardSquareSpaceFrom && {
          backyardSquareSpace: {
            lte: backyardSquareSpaceTo,
          },
        }),
      ...(backyardSquareSpaceFrom &&
        backyardSquareSpaceTo && {
          AND: [
            {
              backyardSquareSpace: {
                lte: backyardSquareSpaceTo,
              },
            },
            {
              backyardSquareSpace: {
                gte: backyardSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(outterSquareSpaceFrom &&
        !outterSquareSpaceTo && {
          outterSquareSpace: {
            gte: outterSquareSpaceFrom,
          },
        }),
      ...(outterSquareSpaceTo &&
        !outterSquareSpaceFrom && {
          outterSquareSpace: {
            lte: outterSquareSpaceTo,
          },
        }),
      ...(outterSquareSpaceFrom &&
        outterSquareSpaceTo && {
          AND: [
            {
              outterSquareSpace: {
                lte: outterSquareSpaceTo,
              },
            },
            {
              outterSquareSpace: {
                gte: outterSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(innerSquareSpaceFrom &&
        !innerSquareSpaceTo && {
          innerSquareSpace: {
            gte: innerSquareSpaceFrom,
          },
        }),
      ...(innerSquareSpaceTo &&
        !innerSquareSpaceFrom && {
          innerSquareSpace: {
            lte: innerSquareSpaceTo,
          },
        }),
      ...(innerSquareSpaceFrom &&
        innerSquareSpaceTo && {
          AND: [
            {
              innerSquareSpace: {
                lte: innerSquareSpaceTo,
              },
            },
            {
              innerSquareSpace: {
                gte: innerSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(semiInnerSquareSpaceFrom &&
        !semiInnerSquareSpaceTo && {
          semiInnerSquareSpace: {
            gte: semiInnerSquareSpaceFrom,
          },
        }),
      ...(semiInnerSquareSpaceTo &&
        !semiInnerSquareSpaceFrom && {
          semiInnerSquareSpace: {
            lte: semiInnerSquareSpaceTo,
          },
        }),
      ...(semiInnerSquareSpaceTo &&
        semiInnerSquareSpaceFrom && {
          AND: [
            {
              semiInnerSquareSpace: {
                lte: semiInnerSquareSpaceTo,
              },
            },
            {
              semiInnerSquareSpace: {
                gte: semiInnerSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(totalBuiltSquareSpaceFrom &&
        !totalBuiltSquareSpaceTo && {
          totalBuiltSquareSpace: {
            gte: totalBuiltSquareSpaceFrom,
          },
        }),
      ...(totalBuiltSquareSpaceTo &&
        !totalBuiltSquareSpaceFrom && {
          totalBuiltSquareSpace: {
            lte: totalBuiltSquareSpaceTo,
          },
        }),
      ...(totalBuiltSquareSpaceTo &&
        totalBuiltSquareSpaceFrom && {
          AND: [
            {
              totalBuiltSquareSpace: {
                lte: totalBuiltSquareSpaceTo,
              },
            },
            {
              totalBuiltSquareSpace: {
                gte: totalBuiltSquareSpaceFrom,
              },
            },
          ],
        }),
      ...(totalSquareSpaceFrom &&
        !totalSquareSpaceTo && {
          totalSquareSpace: {
            gte: totalSquareSpaceFrom,
          },
        }),
      ...(totalSquareSpaceTo &&
        !totalSquareSpaceFrom && {
          totalSquareSpace: {
            lte: totalSquareSpaceTo,
          },
        }),
      ...(totalSquareSpaceTo &&
        totalSquareSpaceFrom && {
          AND: [
            {
              totalSquareSpace: {
                lte: totalSquareSpaceTo,
              },
            },
            {
              totalSquareSpace: {
                gte: totalSquareSpaceFrom,
              },
            },
          ],
        }),
    };

    const config = {
      ...(!!Object.keys(where).length && { where }),
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      include: this.include,
    };

    const allProperties = await this.prisma.property.findMany({
      ...(first && { take: first }),
      ...(after && { skip: 1, cursor: { id: after } }),
      ...config,
    });

    if (!!allProperties?.length) {
      const propertiesLength = await this.prisma.property.count({
        where,
      });
      const lastProperty = allProperties[allProperties.length - 1];
      const myCursor = lastProperty?.id;

      if (!myCursor) {
        return {
          totalCount: propertiesLength,
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      }

      const nextProperties = await this.prisma.property.findMany({
        take: first,
        cursor: {
          id: myCursor,
        },
        ...config,
      });

      const hasNextPage = nextProperties?.length >= first;

      const result = {
        totalCount: propertiesLength,
        pageInfo: {
          endCursor: `${myCursor}`,
          hasNextPage,
        },
        edges: allProperties.map(
          ({
            createdAt,
            id,
            amenities,
            services,
            geoCity,
            geoLocation,
            geoZone,
            images,
            type,
            createdBy,
            ...propertyData
          }) => {
            const {
              pictureId: _,
              password: _3,
              refreshToken: _4,
              ...cuttedCreatedBy
            } = createdBy;

            return {
              cursor: `${id}`,
              node: {
                id: `${id}`,
                createdAt: `${createdAt}`,
                ...(amenities && {
                  amenities,
                }),
                ...(services && {
                  services,
                }),
                ...(images && {
                  images,
                }),
                ...(type && {
                  type: {
                    ...type,
                    states: type.states as State[],
                    id: type.id,
                  },
                }),
                ...(geoCity && {
                  geoCity,
                }),
                ...(geoLocation && {
                  geoLocation,
                }),
                ...(geoZone && {
                  geoZone,
                }),
                ...(createdBy && {
                  createdBy: cuttedCreatedBy,
                }),
                ...propertyData,
              },
            };
          },
        ),
      };

      return result;
    }

    return {
      totalCount: 0,
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      edges: [],
    };
  }

  async findOne(id: string): Promise<Property | null> {
    const foundProperty = await this.prisma.property.findUnique({
      where: { id },
      include: this.include,
    });

    if (!foundProperty) return foundProperty;

    const {
      createdBy: { password: _, pictureId: _3, refreshToken: _4, ...createdBy },
      ...cuttedFoundProperty
    } = foundProperty;

    return { ...cuttedFoundProperty, createdBy };
  }

  async findOneWithOrderedImages(id: string): Promise<Property | null> {
    const foundProperty = await this.prisma.property.findUnique({
      where: { id },
      include: {
        amenities: true,
        services: true,
        images: {
          orderBy: [
            {
              isHighlighted: 'desc' as const, // Imágenes destacadas primero
            },
            {
              order: 'asc' as const, // Luego por orden
            },
          ],
        },
        type: true,
        geoCity: true,
        geoZone: true,
        geoLocation: true,
        owner: true,
        createdBy: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!foundProperty) return foundProperty;

    const {
      createdBy: { password: _, pictureId: _3, refreshToken: _4, ...createdBy },
      ...cuttedFoundProperty
    } = foundProperty;

    return { ...cuttedFoundProperty, createdBy };
  }

  async update(
    id: string,
    {
      type,
      geoCity,
      geoLocation,
      geoZone,
      amenities,
      services,
      images,
      oldImages,
      attachments,
      owner,
      createdByEmail,
      videos,
      ...propertyData
    }: PropertyInput,
  ): Promise<Property> {
    let _images: Image[] = [];

    if (images?.length)
      for (let i = 0; images.length > i; i++) {
        const image = images[i];
        if (image) {
          _images = [
            ..._images,
            await this.imagesService.create(image, '/properties'),
          ];
        }
      }

    if (oldImages?.length)
      for (let i = 0; oldImages.length > i; i++) {
        const oldImage = oldImages[i];
        if (oldImage) {
          await this.imagesService.delete(oldImage.publicId);
        }
      }

    console.info(owner);

    const updatedProperty = await this.prisma.property.update({
      where: { id },
      data: {
        ...propertyData,
        updatedAt: new Date(),
        videos: videos || [],
        attachments: attachments || [],
        createdBy: {
          connect: {
            email: createdByEmail,
          },
        },
        ...(owner && {
          owner: {
            connect: {
              id: owner,
            },
          },
        }),
        ...(type && {
          type: {
            connect: {
              id: type,
            },
          },
        }),
        ...(geoCity && {
          geoCity: {
            connect: {
              id: geoCity,
            },
          },
        }),
        ...(geoLocation && {
          geoLocation: {
            connect: {
              id: geoLocation,
            },
          },
        }),
        ...(geoZone && {
          geoZone: {
            connect: {
              id: geoZone,
            },
          },
        }),
        ...(amenities?.length && {
          amenities: {
            connect: amenities.map((id) => ({
              id: id!,
            })),
          },
        }),
        ...(services?.length && {
          services: {
            connect: services?.map((id) => ({
              id: id!,
            })),
          },
        }),
        ...(_images.length && {
          images: {
            ...(_images?.length && {
              connect: _images.map(({ id }) => ({
                id: id,
              })),
            }),
          },
        }),
      },
      include: this.include,
    });

    const {
      createdBy: { password: _, pictureId: _3, refreshToken: _4, ...createdBy },
      ...cuttedUpdatedProperty
    } = updatedProperty;

    return { ...cuttedUpdatedProperty, createdBy };
  }

  async delete(id: string): Promise<Property> {
    const deletedProperty = await this.prisma.property.delete({
      where: { id },
      include: this.include,
    });
    const images = deletedProperty.images;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image) {
        await this.imagesService.delete(image.publicId);
      }
    }

    const {
      createdBy: { password: _, pictureId: _3, refreshToken: _4, ...createdBy },
      ...cuttedDeletedProperty
    } = deletedProperty;

    return { ...cuttedDeletedProperty, createdBy };
  }
}
