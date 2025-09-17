import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridResolver } from './grid.resolver';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [ImagesModule],
  providers: [GridResolver, GridService],
  exports: [GridService],
})
export class GridModule {}
