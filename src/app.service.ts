import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUptime(start: number): number {
    return (Date.now() - start) / 1000;
  }
}
