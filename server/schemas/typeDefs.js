const { gql } = require('apollo-server-express');

const typeDefs = gql`

type transactionSchema {
  _id: ID
  date: String
  description: String
  type: String
  amount: Float
  balance: Float
}

type accountSchema {
  _id: ID
  dateCreated: String
  accountType: String
  balance: Float
  transactions: [transactionSchema]
}

type User {
    _id: ID
    name: String
    ssn: Int
    email: String
    accounts: [accountSchema]
  }

type Auth {
    token: ID!
    user: User
    me: User
  }

type Query {
    getAllUsers: [User]
    user(_id: String!): User
    me: User
}

type Mutation {
  addUser(name: String!, ssn: Int!, email: String!, password: String!): User!
  login(email: String!, password: String!): User
  createAccount(_id: ID!, accountType: String!, balance: Float!): User
}
`;

module.exports = typeDefs;