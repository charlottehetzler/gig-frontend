import { gql } from "@apollo/client";

export const GET_All_GIGS_FOR_USER = gql`
query getAllGigsForUser($query: GigUserQuery!) {
    getAllGigsForUser(query: $query) {
        id,
        createdAt,
        title,
        description,
        price,
        currency,
        date,
        members {
            id, 
            firstName, 
            lastName,
        }
    }
}
`;

export const GET_All_ACTIVE_GIGS_FOR_USER = gql`
query getAllActiveGigsForUser($query: GigUserQuery!) {
    getAllActiveGigsForUser(query: $query) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency, 
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

export const CREATE_GIG = gql`
mutation createGig($input: GigQuery!) {
    createGig(input: $input) {
        id,
        title,
        price, 
        status,
        description, 
        job {
            id, 
            name
        }
    }
}
`;

export const UPDATE_GIG = gql`
mutation updateGig($input: GigQuery!) {
    updateGig(input: $input) {
        id,
        title,
        price, 
        description, 
        status,
        job {
            id, 
            name
        },
        producer {
            id
        },
        consumer {
            id
        } 
    }
}
`;

