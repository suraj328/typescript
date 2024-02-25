import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

export { typeDefs, resolvers };