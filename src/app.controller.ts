import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private start: number;

  constructor(private readonly appService: AppService) {
    this.start = Date.now();
  }

  @Get('health-check')
  getHealthCheck() {
    return this.appService.getHealthStatus();
  }

  @Get('metrics')
  getMetrics() {
    return this.appService.getMetrics();
  }

  @Get('status')
  getStatus() {
    return {
      status: 'ok',
      uptime: this.appService.getUptime(this.start),
      timestamp: new Date().toISOString(),
      service: 'realstate-api',
    };
  }
}
