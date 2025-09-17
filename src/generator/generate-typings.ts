import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
const isWatchMode = !process.argv.includes('--no-watch');

definitionsFactory.generate({
  typePaths: ['./src/**/*.(gql|graphql)'],
  path: join(process.cwd(), 'src/entities/graphql.schema.ts'),
  outputAs: 'class',
  watch: isWatchMode,
  debug: true,
  emitTypenameField: true,
});
