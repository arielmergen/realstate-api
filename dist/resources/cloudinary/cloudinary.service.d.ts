export declare class CloudinaryService {
    create(base64Image: string, folder?: string): Promise<import("cloudinary").UploadApiResponse>;
    delete(publicId: string): Promise<any>;
}
