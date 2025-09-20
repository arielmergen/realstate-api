import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const databaseUrl = configService.get('DATABASE_URL');
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: [
        { level: 'query', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('🔄 Database disconnected successfully');
    } catch (error) {
      this.logger.error('❌ Error disconnecting from database:', error);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      this.logger.log('🔄 Disconnecting from database...');
      await app.close();
    });
  }

  // Método para verificar la salud de la conexión
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('❌ Database health check failed:', error);
      return false;
    }
  }

  // Método para obtener estadísticas de conexión con tipado mejorado
  async getConnectionStats(): Promise<{
    total_connections: number;
    active_connections: number;
    idle_connections: number;
  } | null> {
    try {
      const result = await this.$queryRaw<Array<{
        total_connections: bigint;
        active_connections: bigint;
        idle_connections: bigint;
      }>>`
        SELECT 
          count(*) as total_connections,
          count(*) FILTER (WHERE state = 'active') as active_connections,
          count(*) FILTER (WHERE state = 'idle') as idle_connections
        FROM pg_stat_activity 
        WHERE datname = current_database()
      `;
      const stats = result[0];
      if (!stats) return null;
      
      return {
        total_connections: Number(stats.total_connections),
        active_connections: Number(stats.active_connections),
        idle_connections: Number(stats.idle_connections),
      };
    } catch (error) {
      this.logger.error('❌ Failed to get connection stats:', error);
      return null;
    }
  }

  // Método para limpiar conexiones inactivas
  async cleanupInactiveConnections(): Promise<boolean> {
    try {
      await this.$queryRaw`
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = current_database()
        AND state = 'idle'
        AND state_change < now() - interval '1 hour'
      `;
      this.logger.log('🧹 Cleaned up inactive connections');
      return true;
    } catch (error) {
      this.logger.error('❌ Failed to cleanup inactive connections:', error);
      return false;
    }
  }
}
