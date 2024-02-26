import { gql } from "apollo-server-express";
// import { CustomResponse } from "../../interface/graphql/graphQLResponse";
const typeDefs = gql`
  type SystemUser {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    systemUsers:[SystemUser!]!
  }
  type Mutation {
    createSystemUser(username: String!, email: String!): SystemUser!
    createUser(username: String!, email: String!): SystemUser!
  }
`;
export default typeDefs;
