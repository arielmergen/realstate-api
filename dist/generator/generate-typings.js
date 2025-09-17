"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const definitionsFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./src/**/*.(gql|graphql)'],
    path: (0, path_1.join)(process.cwd(), 'src/entities/graphql.schema.ts'),
    outputAs: 'class',
    watch: true,
    debug: true,
    emitTypenameField: true,
});
//# sourceMappingURL=generate-typings.js.map