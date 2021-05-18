import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUser($query: UserQuery!) {
    getUser(query: $query) {
        id,
        firstName, 
        lastName, 
        avgRating,
        email,
        birthday,
        nativeLanguage,
        phoneNumber,
        isCallable,
        totalFriends,
        languages {
            id,
            name
        }
    }
}
`;

export const GET_PRODUCERS_FOR_SKILL = gql`
query getProducersForSkill($query: UserQuery!) {
    getProducersForSkill(query: $query) {
        id,
        firstName,
        lastName,
        avgRating,
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

export const UPDATE_PROFILE = gql `
mutation updateProfile($input: UserQuery!) {
    updateProfile(input: $input) {
        id,
        firstName,
        lastName, 
        phoneNumber, 
        nativeLanguage
    }
}
`;

