import { Module } from '@nestjs/common';
import { HomeResolver } from './home.resolver';
import { HomeService } from './home.service';

@Module({
  providers: [HomeResolver, HomeService]
})
export class HomeModule {}
