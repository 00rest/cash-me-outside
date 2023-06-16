const { gql } = require('apollo-server-express');

const typeDefs = gql`
type zelleRecipient {
  _id: ID
  name: String
  zelle_email: String
}

type wireRecipient {
  _id: ID
  name: String
  accountNumber: String
}

type transactionSchema {
  _id: ID
  date: String
  description: String
  transactionType: String
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
    zelleRecipients: [zelleRecipient]
    wireRecipients: [wireRecipient]
  }

type Auth {
    token: ID!
    user: User
  }

type Query {
    getZelle(_id: ID!): zelleRecipient
    getAllUsers: [User]
    userById(_id: String!): User
    user: User
    ZelleRecipientsById(_id: String!): User
}

type Mutation {
  
  addUser(name: String!, ssn: Int!, email: String!, password: String!): Auth
  
  login(email: String!, password: String!): Auth
  
  createAccount(_id: ID!, accountType: String!, balance: Float!): User
  
  createZelleRecipient(_id: ID!, zelle_email: String!, name: String!): User

  createWireRecipient(_id: ID!, accountNumber: String!, name: String!): User
  
  createTransaction(
    userID: ID!,
    accountID: ID,
    description: String!,
    type: String!,
    amount: Float
  ): User

  createZelleRTransaction(
    email: String!,
    description: String!,
    type: String!,
    amount: Float!
  ): User

  createWireRTransaction(
    accountNumber: ID!,
    description: String!,
    type: String!,
    amount: Float!
  ): User

}
`;

module.exports = typeDefs;