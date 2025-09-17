import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ImagesService } from './images.service';
import { CreateImageInput, RolesName, Image } from '../../entities';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly imageService: ImagesService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createImage')
  async create(
    @Args('imageInput') createImageInput: CreateImageInput,
  ): Promise<Image> {
    return await this.imageService.create(createImageInput);
  }

  @Query('images')
  async findAll(): Promise<Image[]> {
    return await this.imageService.findAll();
  }

  @Query('image')
  async findOne(@Args('id') id: string): Promise<Image | null> {
    return await this.imageService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteImage')
  async delete(@Args('publicId') publicId: string): Promise<Image> {
    return await this.imageService.delete(publicId);
  }
}
