import { gql } from "@apollo/client";

export const AUTHENTICATE_QUERY = gql`
  query AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      token
      user {
        _id
        email
        username
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Mutation($newUser: UserInput!) {
    registerUser(newUser: $newUser) {
      user {
        _id
        email
        username
        firstName
        lastName
      }
      token
    }
  }
`;

export const GET_AUTH_USER_QUERY = gql`
  query Query {
    getAuthUser {
      _id
      email
      username
      firstName
      lastName
    }
  }
`;
