const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _snn: SNN
    name: String
    email: String
    password: String
  }

type Auth {
    token: SNN
    user: User
  }

type Query {
    users: [User]!
    user:(userSnn: SNN!): User
}

  type Mutation {
addUser(name: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
