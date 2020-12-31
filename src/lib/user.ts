import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUser($query: UserQuery!) {
    getUser(query: $query) {
        firstName, 
        lastName, 
        avgRating,
        email,
        birthday
    }
}
`;
