import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dbzwnf1pg',
      api_key: process.env.CLOUDINARY_API_KEY || '851961783781533',
      api_secret: process.env.CLOUDINARY_API_SECRET || '7zAmluI14-qBkr7q7kFPYZzmgLI',
    });
  },
};
