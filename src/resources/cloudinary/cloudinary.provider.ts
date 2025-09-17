import { v2 as cloudinary } from 'cloudinary';

//TODO: move to config
export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dbzwnf1pg',
      api_key: '851961783781533',
      api_secret: '7zAmluI14-qBkr7q7kFPYZzmgLI',
    });
  },
};
