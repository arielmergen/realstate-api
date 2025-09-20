import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  const configService = app.get<ConfigService>(ConfigService);
  app.use(json({ limit: '20mb' }));
  
  // Configurar timeouts y keep-alive
  const server = app.getHttpServer();
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
  
  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 API RealState ejecutándose en puerto ${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/api/v1/graphql`);
  console.log(`🏥 Health Check: http://localhost:${port}/health-check`);
}
bootstrap();
