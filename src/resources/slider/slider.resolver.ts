import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  RolesName,
  SliderInput,
  Slider,
  UpdateSliderInput,
} from '../../entities';
import { SliderService } from './slider.service';

@Resolver('Slider')
export class SliderResolver {
  constructor(private readonly sliderService: SliderService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createSlider')
  async create(
    @Args('sliderInput') createSliderInput: SliderInput,
  ): Promise<Slider> {
    return await this.sliderService.create({
      ...createSliderInput,
      imageFolder: '',
    });
  }

  @Query('sliders')
  async findAll(): Promise<Slider[]> {
    return await this.sliderService.findAll();
  }

  @Query('slider')
  async findOne(@Args('id') id: string): Promise<Slider | null> {
    return await this.sliderService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateSlider')
  async update(
    @Args('id') id: string,
    @Args('sliderInput') updateSliderInput: UpdateSliderInput,
  ): Promise<Slider> {
    return this.sliderService.update(id, {
      ...updateSliderInput,
      imageFolder: '',
    });
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteSlider')
  async delete(@Args('id') id: string): Promise<Slider> {
    return await this.sliderService.delete(id);
  }
}
