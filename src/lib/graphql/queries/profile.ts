import { gql } from '@urql/svelte';

export const userProfileQuery = gql`
  query ProfileFromUser {
    profileFromUser {
      id
      displayName
      avatarUrl
    }
  }
`;
