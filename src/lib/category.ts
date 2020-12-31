import { gql } from "@apollo/client";

export const GET_All_CATEGORIES = gql`
query {
    getAllCategories {
        id,
        name,
        jobs {
            id, 
            name,
            producer {
                id
            }
        }
    }
}
`;

export const GET_ONE_CATEGORY_FOR_JOB = gql`
query getCategoryForJob($query: CategoryQuery!) {
    getCategoryForJob(query: $query) {
        name
    }
}
`;

export const CREATE_CATEGORY = gql`
mutation createCategory($input: CategoryQuery!) {
    createCategory(input: $input) {
        id,
        name
    }
}
`;

