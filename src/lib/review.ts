import { gql } from "@apollo/client";

export const GET_LAST_REVIEWS_FOR_USER = gql`
query getLastReviewsForUser($query: ReviewQuery!) {
    getLastReviewsForUser(query: $query) {
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

export const ADD_REVIEW = gql`
mutation addReview($input: ReviewQuery!) {
    addReview(input: $input) {
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

export const GET_SUBMITTED_REVIEW = gql`
query getSubmittedReview($query: ReviewQuery!) {
    getSubmittedReview(query: $query) 
}
`;
