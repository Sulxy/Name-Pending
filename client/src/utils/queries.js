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

export const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;