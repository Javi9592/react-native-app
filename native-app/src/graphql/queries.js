import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
query Me {
  me {
    username
  }
}
`; 

export const REPOSITORY = gql`
query Me($repositoryId: ID!) {
  repository(id: $repositoryId) {
    fullName
    id
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    description
    url
  }
}`

export const USER_REVIEWS = gql `
query Edges {
  me {
    reviews {
      edges {
        node {
          rating
          createdAt
          text
          id
          user {
            username
          }
          repository {
            fullName
            id
          }
        }
      }
    }
  }
}`

export const REPOSITORY_REVIEWS = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    name
    ownerName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`

export const REPOSITORY_REVIEWS_DOS = gql`
query Repositories($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    fullName
    id
    reviews(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}`

export const GET_REPOSITORIES_ORDER = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
        id
        ownerAvatarUrl
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
    }
  }
}`

export const SEARCH_KEY = gql`
query Repositories($searchKeyword: String) {
  repositories(searchKeyword: $searchKeyword) {
    edges {
      node {
        id
        ownerAvatarUrl
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
    }
  }
}`