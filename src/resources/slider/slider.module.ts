import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderResolver } from './slider.resolver';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [ImagesModule],
  providers: [SliderResolver, SliderService],
  exports: [SliderService],
})
export class SliderModule {}
