import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.(gql|graphql)'],
  path: join(process.cwd(), 'src/entities/graphql.schema.ts'),
  outputAs: 'class',
  watch: true,
  debug: true,
  emitTypenameField: true,
});
