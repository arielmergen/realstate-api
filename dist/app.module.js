"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const apollo_server_core_1 = require("apollo-server-core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const properties_module_1 = require("./resources/properties/properties.module");
const amenities_module_1 = require("./resources/amenities/amenities.module");
const services_module_1 = require("./resources/services/services.module");
const property_type_module_1 = require("./resources/property-type/property-type.module");
const images_module_1 = require("./resources/images/images.module");
const neighborhood_module_1 = require("./resources/neighborhood/neighborhood.module");
const zones_module_1 = require("./resources/zones/zones.module");
const entrepreneurship_module_1 = require("./resources/entrepreneurship/entrepreneurship.module");
const prisma_module_1 = require("./db/prisma.module");
const owner_module_1 = require("./resources/owner/owner.module");
const users_module_1 = require("./resources/users/users.module");
const auth_module_1 = require("./resources/auth/auth.module");
const features_module_1 = require("./resources/features/features.module");
const contacts_module_1 = require("./resources/contacts/contacts.module");
const grid_module_1 = require("./resources/grid/grid.module");
const slider_module_1 = require("./resources/slider/slider.module");
const home_configuration_module_1 = require("./resources/home-configuration/home-configuration.module");
const general_configuration_module_1 = require("./resources/general-configuration/general-configuration.module");
const page_module_1 = require("./resources/page/page.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: false,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
                path: '/orbita',
                bodyParserConfig: false,
                typePaths: ['./**/*.graphql'],
                cors: {
                    origin: true,
                    credentials: true,
                },
            }),
            properties_module_1.PropertiesModule,
            amenities_module_1.AmenitiesModule,
            services_module_1.ServicesModule,
            property_type_module_1.PropertyTypeModule,
            images_module_1.ImagesModule,
            neighborhood_module_1.NeighborhoodModule,
            zones_module_1.ZonesModule,
            entrepreneurship_module_1.EntrepreneurshipModule,
            owner_module_1.OwnerModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            features_module_1.FeaturesModule,
            contacts_module_1.ContactsModule,
            grid_module_1.GridModule,
            slider_module_1.SliderModule,
            home_configuration_module_1.HomeConfigurationModule,
            general_configuration_module_1.GeneralConfigurationModule,
            page_module_1.PageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map