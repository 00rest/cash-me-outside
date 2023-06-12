import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
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