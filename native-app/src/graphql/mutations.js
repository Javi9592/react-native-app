import { gql } from '@apollo/client';


export const AUTHORIZE = gql`
mutation Mutation($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
    user {
      username
      id
    }
  }
}`;
