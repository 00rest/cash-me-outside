import { gql } from '@apollo/client';

export const TRANSACTION_TYPE = "CASH" | "ZELLE" | "WIRE";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        accounts {
          accountType
          balance
          _id
        }
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation addUser($name: String!, $ssn: Int!, $email: String!, $password: String!) {
    addUser(name: $name, ssn: $ssn, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ACCOUNT = gql`

  mutation createAccount($id: ID!, $accountType: String!, $balance: Float!) {
    createAccount(_id: $id, accountType: $accountType, balance: $balance) {
      accounts {
        _id
      }
    }
  }
`;


export const ADD_TRANSACTION = gql`

  mutation createTransaction(
    $userID: ID!,
    $accountID: ID,
    $description: String!,
    $type: String!,
    $amount: Float
  ) {
    createTransaction(
      userID: $userID
      accountID: $accountID
      description: $description
      type: $type
      amount: $amount
    ) {
      _id
      accounts {
        _id
        accountType
        balance
        transactions{
          _id
          description
          date
          transactionType
          amount
        }
      }
    }
  }
`;

export const ADD_ZELLE_R_TRANSACTION = gql`

  mutation createZelleRTransaction(
    $email: String!,
    $description: String!,
    $type: String!,
    $amount: Float!
  ) {
    createZelleRTransaction(
      email: $email
      description: $description
      type: $type
      amount: $amount
    ) {
      _id
      accounts { 
        _id
        accountType
        balance
        transactions{
          _id
          description
          date
          transactionType
          amount
        }
      }
    }
  }
`;

export const ADD_WIRE_R_TRANSACTION = gql`

  mutation createWireRTransaction(
    $accountNumber: ID!,
    $description: String!,
    $type: String!,
    $amount: Float!
  ) {
    createWireRTransaction(
      accountNumber: $accountNumber
      description: $description
      type: $type
      amount: $amount
    ) {
      _id
      accounts { 
        _id
        accountType
        balance
        transactions{
          _id
          description
          date
          transactionType
          amount
        }
      }
    }
  }
`;

export const ADD_ZELLE_RECEPIENT = gql`

  mutation createZelleRecipient($id: ID!, $name: String!, $zelle_email: String!) {
    createZelleRecipient(_id: $id, name: $name, zelle_email: $zelle_email) {
      zelleRecipients {
        _id
        name
        zelle_email
      }
    }
  }
`;

export const ADD_WIRE_RECEPIENT = gql`

  mutation createWireRecipient($id: ID!, $name: String!, $accountNumber: String!) {
    createWireRecipient(_id: $id, name: $name, accountNumber: $accountNumber) {
      wireRecipients {
        _id
        name
        accountNumber
      }
    }
  }
`;