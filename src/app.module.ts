import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './resources/properties/properties.module';
import { AmenitiesModule } from './resources/amenities/amenities.module';
import { ServicesModule } from './resources/services/services.module';
import { PropertyTypeModule } from './resources/property-type/property-type.module';
import { ImagesModule } from './resources/images/images.module';
import { NeighborhoodModule } from './resources/neighborhood/neighborhood.module';
import { ZonesModule } from './resources/zones/zones.module';
import { EntrepreneurshipModule } from './resources/entrepreneurship/entrepreneurship.module';
import { PrismaModule } from './db/prisma.module';
import { OwnerModule } from './resources/owner/owner.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { FeaturesModule } from './resources/features/features.module';
import { ContactsModule } from './resources/contacts/contacts.module';
import { GridModule } from './resources/grid/grid.module';
import { SliderModule } from './resources/slider/slider.module';
import { HomeConfigurationModule } from './resources/home-configuration/home-configuration.module';
import { GeneralConfigurationModule } from './resources/general-configuration/general-configuration.module';

import { HomeModule } from './resources/page-home/home.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: '/realstate',
      bodyParserConfig: false,
      typePaths: ['./**/*.graphql'],
      /*formatError: (error) => {
        const graphQLFormattedError = {
          message: error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.name,
        };
        return graphQLFormattedError;
      },*/
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    PropertiesModule,
    AmenitiesModule,
    ServicesModule,
    PropertyTypeModule,
    ImagesModule,
    NeighborhoodModule,
    ZonesModule,
    EntrepreneurshipModule,
    OwnerModule,
    UsersModule,
    AuthModule,
    FeaturesModule,
    ContactsModule,
    GridModule,
    SliderModule,
    HomeConfigurationModule,
    GeneralConfigurationModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
