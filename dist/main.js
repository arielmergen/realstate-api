"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_1.ConfigService);
    app.use((0, body_parser_1.json)({ limit: '20mb' }));
    await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map