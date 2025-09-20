import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, RateLimitInfo>();
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly strictMaxRequests: number;

  constructor(private configService: ConfigService) {
    this.windowMs = parseInt(this.configService.get('RATE_LIMIT_WINDOW_MS', '900000')); // 15 minutos
    this.maxRequests = parseInt(this.configService.get('RATE_LIMIT_MAX', '1000'));
    this.strictMaxRequests = parseInt(this.configService.get('RATE_LIMIT_STRICT_MAX', '60'));
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const clientId = this.getClientId(req);
    const now = Date.now();

    // Limpiar entradas expiradas
    this.cleanupExpiredEntries(now);

    const rateLimitInfo = this.requests.get(clientId);

    if (!rateLimitInfo) {
      // Primera request del cliente
      this.requests.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Verificar si la ventana de tiempo ha expirado
    if (now > rateLimitInfo.resetTime) {
      rateLimitInfo.count = 1;
      rateLimitInfo.resetTime = now + this.windowMs;
      return true;
    }

    // Verificar límites
    if (rateLimitInfo.count >= this.strictMaxRequests) {
      throw new HttpException(
        {
          message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.ceil((rateLimitInfo.resetTime - now) / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (rateLimitInfo.count >= this.maxRequests) {
      console.warn(`⚠️ Rate limit warning for client ${clientId}: ${rateLimitInfo.count}/${this.maxRequests} requests`);
    }

    rateLimitInfo.count++;
    return true;
  }

  private getClientId(req: any): string {
    // Usar IP del cliente como identificador
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    return ip || 'unknown';
  }

  private cleanupExpiredEntries(now: number): void {
    for (const [clientId, info] of this.requests.entries()) {
      if (now > info.resetTime) {
        this.requests.delete(clientId);
      }
    }
  }
}
