import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
query Query {
  getAllUsers {
    _id
    name
    email
    ssn
    accounts {
      _id
      accountType
      balance
    }
  }
}
`;

export const GET_USER_BY_ID = gql`
query Query($id: String!) {
  userById(_id: $id) {
    _id
    name
    email
    ssn
    accounts {
      _id
      accountType
      balance
      transactions{
        _id
        description
        date
        type
        amount
      }
    }
  }
}
`;