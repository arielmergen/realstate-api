import { Module } from '@nestjs/common';
import { GeneralConfigurationService } from './general-configuration.service';
import { GeneralConfigurationResolver } from './general-configuration.resolver';

@Module({
  providers: [GeneralConfigurationResolver, GeneralConfigurationService],
})
export class GeneralConfigurationModule {}
