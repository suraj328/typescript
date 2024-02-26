import { ContextType } from "../../interface/graphqlcontext";
import { systemRoleService } from "../../service/SystemRoleService";
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
      return await systemRoleService.findByPk(id);
    },
  },
  Mutation: {
    createSystemRole: async (_: any, { rolename }: { rolename: string }) => {
      return await systemRoleService.create(rolename);
    },
  },
};
export default resolvers;
