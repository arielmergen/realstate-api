import {
  ExceptionFilter,
  Catch,
  Logger,
} from '@nestjs/common';

@Catch()
export class CloudinaryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CloudinaryExceptionFilter.name);

  catch(exception: any, _host: any) {
    // Solo manejar errores específicos de Cloudinary
    if (!this.isCloudinaryError(exception)) {
      // Re-lanzar errores que no son de Cloudinary
      throw exception;
    }

    const message = this.getCloudinaryErrorMessage(exception);
    this.logger.error(`❌ Error de Cloudinary:`, exception);

    // Para GraphQL, lanzar error con mensaje amigable
    const error = new Error(message);
    error.name = 'CloudinaryError';
    throw error;
  }

  private isCloudinaryError(exception: any): boolean {
    return (
      (exception.message && exception.message.includes('Resource not found')) ||
      (exception.message && exception.message.includes('cloudinary')) ||
      (exception.message && exception.message.includes('ImageNotFoundError')) ||
      (exception.message && exception.message.includes('CloudinaryError'))
    );
  }

  private getCloudinaryErrorMessage(exception: any): string {
    if (exception.message && exception.message.includes('Resource not found')) {
      return 'La imagen solicitada no existe o ha sido eliminada';
    }
    if (exception.message && exception.message.includes('cloudinary')) {
      return 'Error al procesar la imagen. Inténtalo de nuevo.';
    }
    if (exception.message && exception.message.includes('ImageNotFoundError')) {
      return 'La imagen solicitada no existe o ha sido eliminada';
    }
    if (exception.message && exception.message.includes('CloudinaryError')) {
      return 'Error al procesar la imagen. Inténtalo de nuevo.';
    }
    return 'Error al procesar la imagen. Inténtalo de nuevo.';
  }
}
