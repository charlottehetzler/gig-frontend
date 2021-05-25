import { gql } from "@apollo/client";

export const GET_ALL_DEALS = gql`
query {
    getAllDeals {
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
`;

export const CREATE_DEAL = gql`
mutation createDeal($input: DealInput!) {
    createDeal(input: $input) {
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