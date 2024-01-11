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

export const CREATE_REVIEW = gql`
mutation Mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    text
    createdAt
    rating
  }
}`

export const SIGN_UP = gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    username
    reviewCount
    id
    createdAt
  }
}`

export const DELETE_REVIEW = gql `
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}`