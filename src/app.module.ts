import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ValidationRule } from 'graphql';

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

// Funciones auxiliares para validación de queries
function getQueryDepth(document: any): number {
  let maxDepth = 0;
  
  function calculateDepth(selectionSet: any, depth: number): void {
    if (!selectionSet || !selectionSet.selections) return;
    
    maxDepth = Math.max(maxDepth, depth);
    
    for (const selection of selectionSet.selections) {
      if (selection.kind === 'Field' && selection.selectionSet) {
        calculateDepth(selection.selectionSet, depth + 1);
      }
    }
  }
  
  if (document.definitions) {
    for (const definition of document.definitions) {
      if (definition.kind === 'OperationDefinition' && definition.selectionSet) {
        calculateDepth(definition.selectionSet, 1);
      }
    }
  }
  
  return maxDepth;
}

function getQueryComplexity(document: any): number {
  let complexity = 0;
  
  function calculateComplexity(selectionSet: any, depth: number): void {
    if (!selectionSet || !selectionSet.selections) return;
    
    for (const selection of selectionSet.selections) {
      if (selection.kind === 'Field') {
        // Base complexity for each field
        complexity += 1;
        
        // Penalize nested fields
        if (depth > 0) {
          complexity += depth * 2;
        }
        
        // Recursively calculate nested fields
        if (selection.selectionSet) {
          calculateComplexity(selection.selectionSet, depth + 1);
        }
      }
    }
  }
  
  if (document.definitions) {
    for (const definition of document.definitions) {
      if (definition.kind === 'OperationDefinition' && definition.selectionSet) {
        calculateComplexity(definition.selectionSet, 0);
      }
    }
  }
  
  return complexity;
}

// Reglas de validación de GraphQL simplificadas
const validationRules: ValidationRule[] = [
  // Límite de profundidad de query
  (context: any) => {
    if (!context.document || !context.document.definitions) {
      return {};
    }
    const depth = getQueryDepth(context.document);
    if (depth > 10) {
      throw new Error(`Query depth limit exceeded: ${depth} > 10`);
    }
    return {};
  },
  // Límite de complejidad de query
  (context: any) => {
    if (!context.document || !context.document.definitions) {
      return {};
    }
    const complexity = getQueryComplexity(context.document);
    if (complexity > 1000) {
      throw new Error(`Query complexity limit exceeded: ${complexity} > 1000`);
    }
    return {};
  },
];

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      path: '/api/v1/graphql',
      typePaths: ['./**/*.graphql'],
      introspection: true,
      subscriptions: {
        'graphql-ws': {
          onConnect: (_context: any) => {
            console.log('🔌 WebSocket GraphQL conectado');
            return true;
          },
          onDisconnect: (_context: any, _code: any, _reason: any) => {
            console.log('🔌 WebSocket GraphQL desconectado');
          },
        },
      },
      formatError: (error: any) => {
        console.error('GraphQL Error:', error);
        const graphQLFormattedError = {
          message: error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.name,
          timestamp: new Date().toISOString(),
        };
        return graphQLFormattedError;
      },
      context: ({ req }: { req: any }) => ({ req }),
      cache: 'bounded',
      persistedQueries: false,
      validationRules,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault() as any,
      ],
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
