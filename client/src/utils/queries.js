import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            posts {
                _id
                message
                timestamp
            }
        }
    }
`;

export const QUERY_POSTS = gql`
    query posts {
        posts {
            _id
            message
            timestamp
            user {
                _id
                username
            }
        }
    }
`;