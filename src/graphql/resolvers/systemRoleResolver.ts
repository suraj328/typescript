import SystemUser from "../../db/models/SystemUser";
import { ContextType } from "../../interface/graphqlcontext";
import { systemRoleService } from "../../service/SystemRoleService";
const resolvers = {
  Query: {
    systemRoles: (_: any, __: any, context: ContextType) => {
      console.log(context);
      return systemRoleService.findAll();
    },
  },
};
export default resolvers;
