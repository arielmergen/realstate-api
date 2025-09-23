import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CloudinaryErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CloudinaryErrorInterceptor.name);

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Manejar errores específicos de Cloudinary
        if (error.message && error.message.includes('Resource not found')) {
          this.logger.warn(`⚠️ Imagen no encontrada en Cloudinary: ${error.message}`);
          
          // Crear error más amigable
          const friendlyError = new Error('La imagen solicitada no existe o ha sido eliminada');
          friendlyError.name = 'ImageNotFoundError';
          
          return throwError(() => friendlyError);
        }

        // Manejar errores de Cloudinary en general
        if (error.message && error.message.includes('cloudinary')) {
          this.logger.error(`❌ Error de Cloudinary:`, error);
          
          const friendlyError = new Error('Error al procesar la imagen. Inténtalo de nuevo.');
          friendlyError.name = 'CloudinaryError';
          
          return throwError(() => friendlyError);
        }

        // Re-lanzar otros errores sin modificar
        return throwError(() => error);
      }),
    );
  }
}
