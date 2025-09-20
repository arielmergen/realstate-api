import { Injectable } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getUptime(start: number): number {
    return (Date.now() - start) / 1000;
  }

  getMetrics() {
    const memoryUsage = process.memoryUsage();
    return {
      uptime: process.uptime(),
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024), // MB
      },
      cpu: process.cpuUsage(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
    };
  }

  async getHealthStatus() {
    const metrics = this.getMetrics();
    const memoryUsagePercent = (metrics.memory.heapUsed / metrics.memory.heapTotal) * 100;
    
    // Verificar salud de la base de datos
    const dbHealthy = await this.prisma.healthCheck();
    const dbStats = await this.prisma.getConnectionStats();
    
    return {
      status: dbHealthy ? 'ok' : 'degraded',
      uptime: metrics.uptime,
      memory: {
        used: metrics.memory.heapUsed,
        total: metrics.memory.heapTotal,
        percentage: Math.round(memoryUsagePercent),
      },
      database: {
        connected: dbHealthy,
        connections: dbStats,
      },
      timestamp: metrics.timestamp,
    };
  }
}
