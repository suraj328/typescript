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
    systemRoles: [SystemRole!]!
  }
`;
export default typeDefs;
