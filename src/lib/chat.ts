import { gql } from "@apollo/client";

export const GET_CHAT_ROOMS_FOR_USER = gql`
query getChatRoomsForUser($query: ChatRoomQuery!) {
    getChatRoomsForUser(query: $query) {
        id,
        createdAt,
        lastMessage {
            content,
            createdAt, 
            user {
                id,
                firstName,
                lastName
            }
        }
    }
}
`;

export const GET_MESSAGES_BY_CHAT_ROOM = gql`
    query getMessagesByChatRoom($query: MessageQuery!) {
    getMessagesByChatRoom(query: $query) {
        id,
        content,
        user {
            id,
            firstName, 
            lastName
        }

    }
}
`;

export const CREATE_MESSAGE = gql`
mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
        id,
        content,
        user {
            id,
            firstName, 
            lastName
        }

    }
}
`;