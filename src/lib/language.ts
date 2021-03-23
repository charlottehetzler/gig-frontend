import { gql } from "@apollo/client";

export const GET_ALL_LANGUAGES = gql`
query {
    getAllLanguages {
        id,
        name
    }
}
`;

export const GET_ALL_AVAILABLE_LANGUAGES_FOR_USER = gql`
query getAllAvailableLanguagesForUser($query: LanguageQuery!) {
    getAllAvailableLanguagesForUser(query: $query) {
        id,
        name
    } 
}
`;

export const GET_ALL_LANGUAGES_FOR_USER = gql`
query getAllLanguagesForUser ($query: LanguageQuery!) {
    getAllLanguagesForUser (query: $query) {
        id,
        name
    } 
}
`;

export const ADD_OR_UPDATE_LANGUAGE_FOR_USER = gql`
mutation addOrUpdateLanguageForUser($userId: Float!, $languageIds: [Float!]!, $isActive: Boolean!) {
    addOrUpdateLanguageForUser(userId: $userId,languageIds: $languageIds, isActive: $isActive)
}
`;