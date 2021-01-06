import { gql } from "@apollo/client";

export const GET_All_GIGS_FOR_USER = gql`
query getAllGigsForUser($query: GigUserQuery!) {
    getAllGigsForUser(query: $query) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency,
        status, 
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
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
        status,
        currency, 
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

export const GET_GIG_HISTORY = gql`
query getGigHistory($query: GigUserQuery!) {
    getGigHistory(query: $query) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency,
        status,
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

export const GET_ONE_GIG = gql`
query getOneGig($query: GigUserQuery!) {
    getOneGig(query: $query) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency, 
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

export const CREATE_GIG = gql`
mutation updateGig($input: GigQuery!) {
    createGig(input: $input) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency, 
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

export const UPDATE_GIG = gql`
mutation updateGig($input: GigQuery!) {
    updateGig(input: $input) {
        id,
        createdAt,
        title,
        description,
        date,
        price,
        currency, 
        job {
            id,
            name,
            gigCategory {
                id,
                name
            }
        }
        members {
            id,
            firstName,
            lastName
        }
    }
}
`;

