import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async create(base64Image: string, folder?: string) {
    return await cloudinary.uploader.upload(
      base64Image,
      folder ? { folder } : {},
    );
  }

  async delete(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}
