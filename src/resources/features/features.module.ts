import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';
import { ImagesModule } from '../images/images.module';
import { SliderModule } from '../slider/slider.module';
import { GridModule } from '../grid/grid.module';

@Module({
  imports: [ImagesModule, SliderModule, GridModule],
  providers: [FeaturesResolver, FeaturesService],
})
export class FeaturesModule {}
