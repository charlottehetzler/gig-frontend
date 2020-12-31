import { gql } from "@apollo/client";

export const GET_All_JOBS_TEST = gql`
query {
    getAllJobsTest {
        name,
        createdAt,
        category {
            id,
            name
        }
    }
}
`;

export const GET_All_JOBS = gql`
query {
    getAllJobs {
        id,
        name,
        category {
            id, 
            name
        },
        producers {
            id,
        }
    }
}
`;

export const GET_All_JOBS_FOR_PRODUCER = gql`
query getAllJobsForProducer($query: JobQuery!) {
    getAllJobsForProducer(query: $query) {
        id,
        name
    }
}
`;



export const GET_ONE_JOB = gql`
query getOneJob($query: JobQuery!) {
    getOneJob(query: $query) {
        name
    }
}
`;

export const CREATE_JOB = gql`
mutation createJob($input: JobQuery!) {
    createJob(input: $input) {
        id,
        name
    }
}
`;