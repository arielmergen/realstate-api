import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private start: number;

  constructor(private readonly appService: AppService) {
    this.start = Date.now();
  }

  @Get('health-check')
  getHealthCheck(): number {
    return this.appService.getUptime(this.start);
  }
}
