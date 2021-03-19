import { gql } from "@apollo/client";

export const GET_CHAT_ROOMS_FOR_USER = gql`
query getChatRoomsForUser($query: ChatRoomQuery!) {
    getChatRoomsForUser(query: $query) {
        id,
        createdAt,
        lastMessageId,
        lastMessage {
            content, 
            createdAt,
            user {
                id,
                firstName,
                lastName
            }
        }
        members {
            id,
            user {
                id,
                firstName,
                lastName
            }
        }

    }
}
`;

export const GET_USER = gql`
query getUser($query: UserQuery!) {
    getUser(query: $query) {
        id,
        createdAt,
        firstName, 
        allChatRooms {
            id, 
            members {
                id, 
                user {
                    id,
                    firstName,
                    lastName
                }
            },
            lastMessageId,
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

export const GET_COMMON_CHAT_ROOM = gql`
query getCommonChatRoom($currentUserId: Float!, $userId: Float!) {
    getCommonChatRoom(currentUserId: $currentUserId, userId: $userId) {
        id
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

export const CREATE_CHAT_ROOM = gql`
mutation createChatRoom($input: NewChatInput!) {
    createChatRoom(input: $input) {
        id,
    }
}
`;

export const ON_CREATE_MESSAGE = gql`
subscription onCreateMessage {
    onCreateMessage {
        id,
        content,
        createdAt,
        user {
            id,
            firstName, 
            lastName
        }

    }
}
`;

export const UPDATE_CHAT_ROOM_LAST_MESSAGE = gql`
mutation updateChatRoomLastMessage($input: ChatRoomInput!) {
    updateChatRoomLastMessage(input: $input) {
        id,
        createdAt,
        lastMessageId,
        lastMessage {
            id,
            content, 
            createdAt,
            user {
                firstName, 
                lastName
            }
        }
    }
}
`;