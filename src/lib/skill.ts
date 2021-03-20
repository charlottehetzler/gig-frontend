import { gql } from "@apollo/client";

export const GET_All_SKILLS = gql`
query {
    getAllSkills {
        id,
        name,
        category {
            id, 
            name
        }
    }
}
`;

export const GET_All_SKILLS_FOR_PRODUCER = gql`
query getAllSkillsForProducer($query: SkillQuery!) {
    getAllSkillsForProducer(query: $query) {
        id,
        name
    }
}
`;

export const GET_ONE_SKILL = gql`
query getOneSkill($query: SkillQuery!) {
    getOneSkill(query: $query) {
        name
    }
}
`;

export const ADD_SKILL = gql`
mutation addSkill($input: SkillQuery!) {
    addSkill(input: $input) {
        id,
        name
    }
}
`;

export const DELETE_SKILL = gql`
mutation deleteSkill($input: SkillQuery!) {
    deleteSkill(input: $input) 
}
`;


