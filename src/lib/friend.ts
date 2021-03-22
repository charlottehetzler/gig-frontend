import { gql } from "@apollo/client";


export const GET_FRIENDS = gql`
query getFriendsForUser($query: FriendQuery!) {
    getFriendsForUser(query: $query) {
        id,
        firstName, 
        lastName
    }
}
`;

export const GET_NUMBER_OF_FRIENDS = gql`
query getNumberOfFriendsForUser($query: FriendQuery!) {
    getNumberOfFriendsForUser(query: $query) 
}
`;

export const GET_FRIEND_REQUESTS = gql`
query getFriendRequestsForUser($query: FriendQuery!) {
    getFriendRequestsForUser(query: $query) {
        id,
        firstName, 
        lastName
    }
}
`;

export const ACCEPT_OR_DECLINE_REQUEST = gql`
mutation acceptOrDeclineRequest($input: FriendQuery!) {
    acceptOrDeclineRequest(input: $input) {
        id,
        status
    }
}
`;

export const SEND_FRIEND_REQUEST = gql`
mutation sendFriendRequest($input: FriendQuery!) {
    sendFriendRequest(input: $input) {
        id,
        status
    }
}
`;