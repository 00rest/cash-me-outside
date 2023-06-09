const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    name: String
    email: String
    password: String
    snn: Number
  }
type Transaction {
    _id: ID
    transactionInfo: String
    transactionUser: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    users: [User]
    user(name: String!): User
    transaction(name: String): [Transaction]
    transaction(transactionId: ID!): Transaction
}

type Mutation {
addUser(name: String!, email: String!, password: String!, snn: Number!): Auth
login(email: String!, password: String!): Auth
addTransaction(transactionInfo: String!): Transaction
}
`;