import { gql } from "@apollo/client";

export const GET_LAST_REVIEW_FOR_USER = gql`
query getLastReviewForUser($query: ReviewQuery!) {
    getLastReviewForUser(query: $query) {
        id,
        rating,
        comment,
        createdAt,
        fromUser {
            firstName,
            lastName
        }
    }
}
`;

export const GET_REVIEWS_FOR_USER = gql`
query getReviewsForUser($query: ReviewQuery!) {
    getReviewsForUser(query: $query) {
        id,
        rating,
        comment,
        createdAt,
        fromUser {
            firstName,
            lastName
        }
    }
}
`;