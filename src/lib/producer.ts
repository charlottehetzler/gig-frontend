import { gql } from "@apollo/client";

export const GET_PRODUCERS_FOR_JOB = gql`
query getProducersForJob($query: ProducerQuery!) {
    getProducersForJob(query: $query) {
        id,
        lastGig {
            createdAt
        },
        user {
            id,
            firstName,
            lastName,
            avgRating,
        },
        reviews {
            rating,
            comment,
            fromUser {
                id,
                firstName, 
                lastName, 
                avgRating,
                reviews {
                    rating,
                    comment
                }

            }
        }
    }
}
`;