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

export const LOGIN_USER = gql`
mutation userLogin($input: LoginInput!) {
    userLogin(input: $input) {
        userId,
        token,
        firstName,
        userType
    }
}
`;

export const SIGNUP_USER = gql`
mutation userSignup($input: SignupInput!) {
    userSignup(input: $input) {
        userId,
        token,
        firstName,
        lastName, 
        userType
    }
}
`;

export const UPDATE_USER = gql `
mutation userUpdate($input: UpdateInput!) {
    userUpdate(input: $input) {
        userId,
        token,
        firstName,
        lastName, 
        userType
    }
}
`;