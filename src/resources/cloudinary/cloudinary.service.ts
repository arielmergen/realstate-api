import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async create(base64Image: string, folder?: string) {
    try {
      this.logger.log(`📤 Subiendo imagen a Cloudinary en carpeta: ${folder || 'root'}`);
      
      const result = await cloudinary.uploader.upload(
        base64Image,
        folder ? { folder } : {},
      );
      
      this.logger.log(`✅ Imagen subida exitosamente: ${result.public_id}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Error al subir imagen a Cloudinary:`, error);
      throw new Error(`Error al subir imagen: ${error.message}`);
    }
  }

  async delete(publicId: string) {
    try {
      this.logger.log(`🗑️ Eliminando imagen de Cloudinary: ${publicId}`);
      
      // Verificar si la imagen existe antes de eliminar
      const exists = await this.imageExists(publicId);
      if (!exists) {
        this.logger.warn(`⚠️ Imagen no encontrada en Cloudinary: ${publicId}`);
        return { result: 'not_found' };
      }
      
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        this.logger.log(`✅ Imagen eliminada exitosamente: ${publicId}`);
      } else {
        this.logger.warn(`⚠️ Imagen no pudo ser eliminada: ${publicId} - ${result.result}`);
      }
      
      return result;
    } catch (error) {
      this.logger.error(`❌ Error al eliminar imagen de Cloudinary:`, error);
      // No lanzar error para evitar fallos en cascada
      return { result: 'error', error: error.message };
    }
  }

  async imageExists(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return !!result;
    } catch (error) {
      if (error.http_code === 404) {
        return false;
      }
      this.logger.error(`❌ Error al verificar existencia de imagen:`, error);
      return false;
    }
  }

  async getImageInfo(publicId: string) {
    try {
      return await cloudinary.api.resource(publicId);
    } catch (error) {
      if (error.http_code === 404) {
        throw new Error(`Imagen no encontrada: ${publicId}`);
      }
      this.logger.error(`❌ Error al obtener información de imagen:`, error);
      throw new Error(`Error al obtener información de imagen: ${error.message}`);
    }
  }
}
