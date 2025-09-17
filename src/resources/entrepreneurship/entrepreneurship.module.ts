import { Module } from '@nestjs/common';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { EntrepreneurshipResolver } from './entrepreneurship.resolver';

@Module({
  providers: [EntrepreneurshipResolver, EntrepreneurshipService],
})
export class EntrepreneurshipModule {}
