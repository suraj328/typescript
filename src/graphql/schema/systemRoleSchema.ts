import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type SystemRole {
    systemRoleId: ID!
    systemRoleName: String!
    activeStatus: Boolean!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
  type Query {
    systemRoles(sortBy:Int!): [SystemRole!]!
    systemRolesByPk(id: ID!): SystemRole
  }
  type Mutation{
    createSystemRole(rolename:String):SystemRole!
  }
`;
export default typeDefs;
