import { Module } from '@nestjs/common';
import { HomeConfigurationService } from './home-configuration.service';
import { HomeConfigurationResolver } from './home-configuration.resolver';
import { SliderModule } from '../slider/slider.module';
import { GridModule } from '../grid/grid.module';

@Module({
  imports: [SliderModule, GridModule],
  providers: [HomeConfigurationResolver, HomeConfigurationService],
})
export class HomeConfigurationModule {}
