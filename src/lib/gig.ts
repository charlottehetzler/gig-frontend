import { gql } from "@apollo/client";

export const GET_ALL_GIGS = gql`
query getAllGigs($isAd: Boolean!) {
    getAllGigs(isAd: $isAd) {
        id,
        title,
        description,
        fromDate, 
        toDate,
        skill {
            id
            name
        }
        category {
            id, 
            name
        }
        user {
            id
            firstName
            lastName
        }
    }
}
`

export const CREATE_GIG = gql`
mutation createGig($input: GigInput!) {
    createGig(input: $input) {
        id,
        title,
        description,
        fromDate, 
        toDate

    }
}
`

export const GET_ALL_DEALS_FOR_PRODUCER = gql`
query getAllDealsForProducer($userId: Float!) {
    getAllDealsForProducer(userId: $userId) {
        id,
        title,
        description,
        fromDate,
        toDate,
        skill {
            id
            name
        }
        category {
            id, 
            name
        }
        user {
            id
            firstName
            lastName
        }

    }
}
`

export const GET_ALL_GIGS_FOR_CONSUMER = gql`
query getAllGigsForConsumer($userId: Float!) {
    getAllGigsForConsumer(userId: $userId) {
        id,
        title,
        description,
        fromDate,
        toDate,
        skill {
            id
            name
        }
        category {
            id, 
            name
        }
        user {
            id
            firstName
            lastName
        }

    }
}
`