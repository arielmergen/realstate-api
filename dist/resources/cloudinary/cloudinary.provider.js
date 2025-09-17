"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'dbzwnf1pg',
            api_key: '851961783781533',
            api_secret: '7zAmluI14-qBkr7q7kFPYZzmgLI',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map