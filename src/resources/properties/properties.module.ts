import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesResolver } from './properties.resolver';
import { ImagesModule } from '../images/images.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [ImagesModule, OwnerModule],
  providers: [PropertiesResolver, PropertiesService],
})
export class PropertiesModule {}
