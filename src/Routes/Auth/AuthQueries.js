import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
// mutation [아무이름]($email: String!)

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $usernanme: String!
    $email: String!
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    createAccount(
      usernanme: $usernanme
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
