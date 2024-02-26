import { ContextType } from "../../interface/graphqlcontext";
import { systemRoleService } from "../../service/SystemRoleService";
import { GraphQLError } from "graphql";
const resolvers = {
  Query: {
    systemRoles: async (
      _: any,
      { sortBy }: { sortBy: number },
      context: ContextType
    ) => {
      return await systemRoleService.findAll(sortBy);
    },

    systemRolesByPk: async (
      _: any,
      { id }: { id: number },
      context: ContextType
    ) => {
      const result = await systemRoleService.findByPk(id);
      return result;
    },
  },
  Mutation: {
    createSystemRole: async (_: any, { rolename }: { rolename: string }) => {
      return await systemRoleService.create(rolename);
    },
  },
};
export default resolvers;