import SystemUser from "../../db/models/SystemUser";
import { ContextType } from "../../interface/graphqlcontext";
import { systemUserService } from "../../service/SystemUserService";
const resolvers = {
  Query: {
    systemUsers: (_: any, __: any, context: ContextType) => {
      console.log(context);
      return systemUserService.findAll();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username, email }: { username: string; email: string }
    ) => {
      try {
        const user = await SystemUser.create({ username, email });
        return user;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    },
  },
};
export default resolvers;
